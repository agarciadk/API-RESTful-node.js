$(document).ready(() => {
  $('#loginForm').submit(login)
})

function login (e) {
  e.preventDefault()
  let formData = new FormData($(this)[0])
  // function request () {
  //   return new Promise(function (resolve, reject) {
  //     let xhr = new XMLHttpRequest()
  //     xhr.open('post', '/api/signin', true)
  //     xhr.onload = resolve
  //     xhr.onerror = reject
  //     xhr.send(formData)
  //   })
  // }
  // request()
  const myHeaders = new Headers()
  //myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  fetch('/api/signin', {
    method: 'post',
    body: formData
  })
  .then(res => {
    if(!res.ok) throw Error(res.statusText)
    return res.json()
  })
  .then(data => {
    localStorage.setItem('token', data.token)
    redirect('/api/')
  })
  .catch(err => console.log(err))
}
function redirect (url) {
  location.href=url
}
