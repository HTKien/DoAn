var classID;
let classIDStorageGet = localStorage.getItem('classIDStorage') ? JSON.parse(localStorage.getItem('classIDStorage')) : [];
classID = classIDStorageGet[0].id;
localStorage.clear();