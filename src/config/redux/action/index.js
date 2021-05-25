import firebase, {database} from '../../firebase';

export const actionUserName = () => (dispatch) => {
    // asycronus function harus import redux thunk
    setTimeout(() => {
      return dispatch({type: 'CHANGE_USER', value: 'nur'})
    }, 2000) 
}

export const registerUserAPI = (data) => (dispatch) => {
  return new Promise ((resolve, reject) => {
    dispatch({type: 'CHANGE_LOADING', value: true})
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(res => {
      console.log('sukses', res);
      dispatch({type: 'CHANGE_LOADING', value: false})
      resolve(true);
      
    }).catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      
      console.log('gagal', errorCode);
      console.log('gagal', errorMessage);
      dispatch({type: 'CHANGE_LOADING', value: false})
      reject(false);
    })
  })
}

export const loginUserAPI = (data) => (dispatch) => {

  return new Promise((resolve, reject) => {
    dispatch({type: 'CHANGE_LOADING', value: true})
      firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(res => {
        // console.log('sukses', res);
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          refreshToken: res.user.refreshToken
        }
        dispatch({type: 'CHANGE_LOADING', value: false})
        dispatch({type: 'CHANGE_LOGIN', value: true})
        dispatch({type: 'CHANGE_USER', value: dataUser})
        resolve(dataUser)

      }).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        
        console.log('gagal', errorCode);
        console.log('gagal', errorMessage);
        dispatch({type: 'CHANGE_LOADING', value: false})
        dispatch({type: 'CHANGE_LOGIN', value: false})
        reject(false)
      })
  })
}

export const addDataToAPI = (data) => (dispatch) => {
  database.ref('notes/' + data.userId).push({
    title: data.title,
    content: data.content,
    date: data.date
  })
}

export const getDataToAPI = (userId) => (dispatch) => {
  const urlNotes =  database.ref('notes/' + userId);
  
  return new Promise((resolve, reject) => {
      urlNotes.on('value', (snapshot) => {
      console.log('get data', snapshot.val());

      const data = [];
      Object.keys(snapshot.val()).map(key => {
        data.push({
          id: key,
          data: snapshot.val()[key]
        })
        // return key
      });

      dispatch({type: 'SET_NOTES', value: data})
      resolve(snapshot.val())
    });
  })
}

export const updateDataToAPI = (data) => (dispatch) => {
  const urlNotes =  database.ref(`notes/${data.userId}/${data.noteId}`);
  
  return new Promise((resolve, reject) => {
      urlNotes.set({
        title: data.title,
        content: data.content,
        date: data.date
      }, (err) => {
        if(err){
          reject(false)
        } else {
          resolve(true)
        }
      });
  })
}

export const deleteDataToAPI = (data) => (dispatch) => {
  const urlNotes =  database.ref(`notes/${data.userId}/${data.noteId}`);
  
  return new Promise((resolve, reject) => {
      urlNotes.remove();
  })
}