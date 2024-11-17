import { Injectable } from '@angular/core';
import {
  Firestore,
  DocumentReference,
  doc,
  getDoc,
  docData,
} from '@angular/fire/firestore';
import {
  Auth,
  authState,
  signInAnonymously,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  UserCredential,
  GithubAuthProvider,
  idToken,
  getIdToken,
} from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';
import { UserDataService } from './user-data.service';
import { DataProvider } from '../providers/data.provider';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userDoc: DocumentReference | undefined;
  checkerUserDoc: DocumentReference | undefined;
  private loggedIn: boolean = false;
  constructor(
    private auth: Auth,
    private userData: UserDataService,
    private alertify: AlertsAndNotificationsService,
    private firestore: Firestore,
    private router: Router,
    private dataProvider: DataProvider
  ) {
    if (auth) {
      // console.log("Auth is not null");
      this.user = authState(this.auth);
      this.setDataObserver(this.user);
      this.userDisposable = authState(this.auth)
        .pipe(map((u) => !!u))
        .subscribe((isLoggedIn) => {
          this.loggedIn = isLoggedIn;
          this.dataProvider.loggedIn = isLoggedIn;
        });
    } else {
      this.loggedIn = false;
      this.dataProvider.loggedIn = false;
      console.log('Auth is null');
    }
  }
  private userServerSubscription: Subscription | undefined = undefined;
  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;

  // Read functions start
  public get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public get getUser(): Observable<User | null> {
    return this.user;
  }
  public getIdToken(user: User) {
    return getIdToken(user, true);
  }
  // Read functions end
  // Sign in functions start
  public signInWithGoogle() {
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    let data = signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(async (credentials: UserCredential) => {
        await this.userData.setUserData(credentials.user);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.dataProvider.pageSetting.blur = false;
        if (error.code === 'auth/popup-closed-by-user') {
          this.alertify.presentToast('Login cancelled.', 'error', 5000);
        } else {
          this.alertify.presentToast(error.message, 'error', 5000);
        }
      });
  }
  public signInWithFacebook() {
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    let data = signInWithPopup(this.auth, new FacebookAuthProvider())
      .then(async (credentials: UserCredential) => {
        this.userData.setUserData(credentials.user);
      })
      .catch((error) => {
        this.dataProvider.pageSetting.blur = false;
        if (error.code === 'auth/popup-closed-by-user') {
          this.alertify.presentToast('Login cancelled.', 'error', 5000);
        } else {
          this.alertify.presentToast(error.message, 'error', 5000);
        }
      });
  }
  public signInWithGithub() {
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    let data = signInWithPopup(this.auth, new GithubAuthProvider())
      .then(async (credentials: UserCredential) => {
        this.userData.setUserData(credentials.user);
      })
      .catch((error) => {
        this.dataProvider.pageSetting.blur = false;
        if (error.code === 'auth/popup-closed-by-user') {
          this.alertify.presentToast('Login cancelled.', 'error', 5000);
        } else {
          this.alertify.presentToast(error.message, 'error', 5000);
        }
      });
  }
  public async loginAnonymously() {
    signInAnonymously(this.auth).then((credentials: UserCredential) => {
      this.userData.setUserData(credentials.user);
    });
  }

  public async loginEmailPassword(email: string, password: string) {
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    let data = await signInWithEmailAndPassword(this.auth, email, password)
      .then((credentials: UserCredential) => {
        this.userData.setUserData(credentials.user);
      })
      .catch((error) => {
        this.dataProvider.pageSetting.blur = false;
        if (error.code === 'auth/user-not-found') {
          this.alertify.presentToast('User not found.', 'error', 5000);
        } else if (error.code === 'auth/wrong-password') {
          this.alertify.presentToast('Wrong password.', 'error', 5000);
        } else {
          this.alertify.presentToast(error.message, 'error', 5000);
        }
      });
  }
  public signUpWithEmailAndPassword(
    email: string,
    password: string,
    username: string
  ) {
    console.log('Signing Up');
    this.dataProvider.pageSetting.blur = true;
    this.dataProvider.pageSetting.lastRedirect = '';
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((credentials: UserCredential) => {
        this.userData.setUserData(credentials.user, username);
      })
      .catch((error) => {
        this.dataProvider.pageSetting.blur = false;
        if (error.code === 'auth/weak-password') {
          this.alertify.presentToast('Password is weak.', 'error', 5000);
        } else if (error.code === 'auth/email-already-in-use') {
          this.alertify.presentToast('Email already in use.', 'error', 5000);
        } else {
          this.alertify.presentToast(error.message, 'error', 5000);
        }
      });
  }
  // Sign in functions end
  // Sign out functions start
  public async logout() {
    this.alertify.presentToast('You have been logged out.');
    return await signOut(this.auth);
  }
  private setDataObserver(user: Observable<User | null>) {
    if (user) {
      user.subscribe((u) => {
        if (u) {
          this.dataProvider.loggedIn = true;
          this.dataProvider.gettingUserData = true;
          this.dataProvider.userID = u.uid;
          this.userDoc = doc(this.firestore, 'users/' + u.uid);
          if (this.userServerSubscription != undefined) {
            this.userServerSubscription.unsubscribe();
          }
          if (u.isAnonymous) {
            this.dataProvider.gettingUserData = false;
          } else {
            this.userServerSubscription = docData(this.userDoc).subscribe(
              (data: any) => {
                this.dataProvider.userData = data;
                this.dataProvider.gettingUserData = false;
              }
            );
          }
        }
      });
    } else {
      if (this.userServerSubscription != undefined) {
        this.userServerSubscription.unsubscribe();
      }
    }
  }
}
