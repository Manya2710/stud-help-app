import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer className="p-4 text-center text-md text-gray-300 bg-gray-900">
        <div className="grid grid-cols-3 h-fit text-lg"> 
  
        <div className="h-max">
        <h1 className='text-4xl p-12'>Student Companion</h1>
      </div>


        <div>
          <ul>
        <li><h2 className='text-xl'>About Us</h2></li>
        <li>Blog</li>
        <li>Privacy Policy</li>
        <li>Terms&Conditions</li>
      </ul>
        
      </div>

        <div>
          <ul>
        <li><h2 className='text-xl'>Contact Us</h2></li>
        <li>Instagram <i className="fa-brands fa-instagram"></i></li>
        <li>Telegram <i className="fa-solid fa-paper-plane"></i></li>
        <li>Facebook <i className="fa-brands fa-facebook"></i></li>
        <li>Youtube <i className="fa-brands fa-youtube"></i></li>
      </ul>
      </div> 
     
      </div>
        ©2025 Student Companion. Built for Students, by
        Students.
      </footer>
    </div>
  )
}
