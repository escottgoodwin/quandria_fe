import {
  FETCH_TESTS,
  FETCH_TEST,
  ADD_TEST,
  EDIT_TEST,
  DELETE_TEST,
  RELEASE_ALL_QUESTIONS
} from './types';

import { test_cycleRef } from "../firebase";

export const fetchTest = test_id => dispatch =>

    test_cycleRef.doc(test_id)
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        dispatch({
          type: FETCH_TEST,
          payload: {'test_id':test_id,'course_id':doc.data().class_id,'test_number':doc.data().test_number,'test_date':doc.data().test_date.toDate().toString('en-EN'),'edit_test_date':new Date(doc.data().test_date.toDate()).toISOString().slice(0,10).replace(/-/g,"-"),'Subjects':doc.data().Subjects,'all_questions':doc.data().all_questions}
          })
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });

  export const fetchTests = course_id => dispatch =>
        test_cycleRef.where("class_id", "==", course_id)
        .get()
        .then(querySnapshot => {
            var tests = []
            querySnapshot.forEach(function(doc) {
                const test_item ={'course_id':course_id,'test_id':doc.id,'Subjects':doc.data().Subjects,'all_questions':doc.data().all_questions,'class_id':doc.data().class_id,'question_ids':doc.data().question_ids,'test_date':doc.data().test_date,'test_number':doc.data().test_number}
                tests.push(test_item)
            });
            dispatch({
              type: FETCH_TESTS,
              payload: tests
              })
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        })

export const addTest = newTest => dispatch => {
  test_cycleRef.add(newTest)
  dispatch({
    type: ADD_TEST,
    payload: "New Test Added"
    })
}

export const editTest = editTest => dispatch => {
  test_cycleRef.doc(editTest.test_id).set({Subjects:editTest.data.Subjects,test_number:editTest.data.test_number,test_date:editTest.data.test_date},{ merge: true })
  dispatch({
    type: EDIT_TEST,
    payload: "Test Updated"
    })
}

export const deleteTest = test_id => dispatch => {
  test_cycleRef.doc(test_id).delete()

  dispatch({
    type: DELETE_TEST,
    payload:"Test Deleted"
    })
}

export const releaseAllQuestions = test_id => dispatch => {
  const release_date = new Date()
  test_cycleRef.doc(test_id).set({all_questions:true,release_date:release_date},{ merge: true })
  dispatch({
    type: RELEASE_ALL_QUESTIONS,
    payload:{"message":"Questions Released"}
    })

}
