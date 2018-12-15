import {
  FETCH_CLASSES,
  FETCH_CLASS,
  ADD_CLASS,
  EDIT_CLASS,
  DELETE_CLASS
} from './types';

import { classRef } from "../firebase";

export const fetchClass = course_id => dispatch =>
  classRef.doc(course_id)
  .get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      dispatch({
        type: FETCH_CLASS,
        payload: doc.data()
        })
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });

export const fetchClasses = teacher_id => dispatch =>

  classRef.where("teacher_id", "==", teacher_id)
  .get()
  .then(querySnapshot => {
      var classes = []
      querySnapshot.forEach(function(doc) {
          const class_item ={'class_id':doc.id,'name':doc.data().name,'school_id':doc.data().school_id,'time':doc.data().time}
          classes.push(class_item)
      });
      dispatch({
        type: FETCH_CLASSES,
        payload: classes
        })
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  })

export const addClass = newClass => dispatch => {
  classRef.add(newClass)
  dispatch({
    type: ADD_CLASS,
    payload: "Class Added!"
    })
  }

export const editClass = editClass => dispatch => {
  classRef.doc(editClass.class_id).set({name:editClass.data.name,school_id:editClass.data.school_id,time:editClass.data.time},{ merge: true })
  dispatch({
    type: EDIT_CLASS,
    payload: "Class Edited!"
    })
  }

export const deleteClass = class_id => dispatch => {
  classRef.doc(class_id).delete()
  // delete tests associated with class
  dispatch({
    type: DELETE_CLASS,
    payload:"Class Deleted!"
    })
}
