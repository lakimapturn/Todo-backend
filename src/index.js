import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  Timestamp,
  addDoc,
} from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB87KSS_tycmE8d1XhndI8C0hMlRS5yrJ4",
  authDomain: "test-e9c7f.firebaseapp.com",
  projectId: "test-e9c7f",
  storageBucket: "test-e9c7f.appspot.com",
  messagingSenderId: "128604779873",
  appId: "1:128604779873:web:4bb1b94f5e7b12a8424120",
  measurementId: "G-TLJ73T58M7",
};

// initializing firebase app
initializeApp(firebaseConfig);

// initializing services
const db = getFirestore();

// collection reference
const taskRef = collection(db, "tasks");
const labelRef = collection(db, "labels");

// getting collections
const tasks = [];
const labels = [];

getDocs(taskRef)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      tasks.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    console.log(tasks);
  })
  .catch((err) => {
    console.log(err);
  });

getDocs(labelRef)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => labels.push({ ...doc.data(), id: doc.id }));
    console.log(labels);
    console.log(
      tasks.filter((task) => labels?.find((label) => label.id == task.label))
    );
  })
  .catch((err) => {
    console.log(err);
  });

// adding a task
const form = document.querySelector(".add");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  /*
  required fields --> title
  optional fields --> desc, due_date, start_date, links
  */

  addDoc(taskRef, {
    title: form.title.value,
    desc: form.desc ? form.desc.value : "",
    due_date: form.due_date
      ? Timestamp.fromDate(new Date(form.due_date.value))
      : null,
    completed: false, // default = false
    start_date: form.start_date
      ? Timestamp.fromDate(new Date(form.start_date.value))
      : null,
    links: form.links ? form.links : null,
    label: form.label ? form.label.value : null,
    checkbox: form.checkbox ? form.checkbox : null,
  }).then(() => {
    form.reset();
  });
});
