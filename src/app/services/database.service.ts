import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  orderBy,
  query,
  limit,
  doc,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { getDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  storage = getStorage();

  constructor(private fs: Firestore) {}

  async upload(
    path: string,
    file: File | ArrayBuffer | Blob | Uint8Array
  ): Promise<any> {
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (e: any) {
        console.error(e);
        return e;
      }
    } else {
      return false;
    }
  }

  getCustomers() {
    // return getDocs(query(collection(this.fs,'users'),where('access.access','==','customer')));
    return getDocs(collection(this.fs, 'users'));
  }

  getAgents() {
    // return getDocs(query(collection(this.fs,'users'),where('access.access','==','agent')));
    return getDocs(collection(this.fs, 'users'));
  }

  getTransactions() {
    return getDocs(
      query(collection(this.fs, 'transactions'), orderBy('timestamp', 'desc'))
    );
  }

  getFirstTransactions(length: number) {
    return getDocs(
      query(
        collection(this.fs, 'transactions'),
        orderBy('timestamp', 'desc'),
        limit(length)
      )
    );
  }

  getUser(userId: string) {
    return getDoc(doc(this.fs, 'users/' + userId));
  }
}
