import * as firebase from "firebase";

import {
  FETCH_PANELS,
  FETCH_TEST_PANELS,
  ADD_PANELS_TEST,
  UPLOAD_PANELS,
  DELETE_PANEL
} from './types';

import { qpanelsRef,storageRef } from "../firebase";

export const fetchAllPanels = course_id => dispatch =>
  //fetch questions from server and set them to payload
  qpanelsRef.where("test_id", "==", course_id)
  .get()
  .then(querySnapshot => {
      var panels = []
      querySnapshot.forEach(function(doc) {
          const panel ={'panel_id':doc.id,'link':doc.data().link,'isChecked':doc.data().isChecked,'test_id':doc.data().test_id}
          panels.push(panel)
      });
      dispatch({
      type: FETCH_PANELS,
      payload: panels
      })
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  })

  export const fetchTestPanels = test_id => dispatch =>
    //fetch questions from server and set them to payload
    qpanelsRef.where("test_id", "==", test_id)
    .get()
    .then(querySnapshot => {
      if(querySnapshot.length>0){
        console.log(querySnapshot)
          var test_panels = []
          querySnapshot.forEach(function(doc) {
              const panel ={'panel_id':doc.id,'link':doc.data().link,'course_id':doc.data().course_id,'test_id':doc.data().test_id}
              test_panels.push(panel)
          });
          dispatch({
          type: FETCH_TEST_PANELS,
          payload: test_panels
          })
      }
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    })

export const addPanelTests = panel => dispatch => {
  qpanelsRef.doc(panel.panel_id).set({test_id:panel.test_id,isChecked:panel.isChecked},{ merge: true })
  dispatch({
    type: ADD_PANELS_TEST,
    payload: 1
  })
  }

export const deletePanel = panel_id => dispatch => {
  qpanelsRef.doc(panel_id).delete()
  dispatch({
    type: DELETE_PANEL,
    payload: "Panel Deleted!"
  })
  }



export const uploadPanels = panel => dispatch => {

  var uploadTask = storageRef.child('panels/'+panel.file.name).put(panel.file);
  uploadTask.on('state_changed', function(snapshot){

    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
      default:
        break;

    }
  }, function(error) {

  }, function() {

    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      const panel_link={course_id:panel.course_id,test_id:panel.test_id,link:downloadURL}
      qpanelsRef.add(panel_link)
      console.log(panel_link)
    });
  });
  dispatch({
    type: UPLOAD_PANELS,
    payload: 1
  })
}
