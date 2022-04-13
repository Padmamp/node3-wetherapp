//const express = require('express')

console.log('Use this site to get your weather')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

if (weatherForm) {
    weatherForm.addEventListener('submit', (e) =>{
        e.preventDefault()
        const location = search.value
        fetch('http://localhost:3000/weather?address=' + location).then((response) =>{
            response.json().then((data) =>{
                messageone.textContent = 'Loading....'
                messagetwo.textContent = ''
            if (data.error){
                messageone.textContent = 'Data Error '
                messagetwo.textContent = 'Actual error is' + data.error
                console.log('data.error'+data.error)
            } else {
                messagetwo.textContent = 'Forecast for Locaton is ' + data.location + ' :::: ' + data.forecast.description
                //messagetwo.textContent = 'Forcast is => ' + data.forecast.description
                console.log('forecast ' + data.forecast.description)
                console.log('Location ' + data.location)
            }
        })
    })

    })
}
