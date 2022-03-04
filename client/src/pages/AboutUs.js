import React from 'react';
import FemaleAvatar from '../assets/profile_pic/FemaleAvatar.jpg';
import MaleAvatar from '../assets/profile_pic/MaleAvatar.jpg';
import Hafsa_Resume from '../assets/resume/Hafsa_Resume.pdf';
import Tanzil_Resume from '../assets/resume/Tanzil_Resume.pdf';
import Tenzin_Resume from '../assets/resume/Tenzin_Resume.pdf';
import DevInfo from '../components/DevInfo';

export default function AboutUs() {
    const data = [
        {
            authorInitial: 'TT',
            authorName: 'Tenzin Tashi',
            authorBio: 'I am a fullstack software engineer with a passion for learning and building software. I am also learning about machine learning and data science.',
            authorImg: MaleAvatar,
            gitHub: 'https://github.com/tenzin1308',
            linkedIn: 'https://www.linkedin.com/in/tenzin-tashi-bb520510a/',
            resume: Tenzin_Resume,
            portfolio: 'https://tenzinportfolio.netlify.app',
        },
        {
            authorInitial: 'JP',
            authorName: 'Justin Park',
            authorBio: 'I am a fullstack software engineer with a passion for learning and building software. I am also learning about machine learning and data science.',
            authorImg: MaleAvatar,
            gitHub: 'https://github.com/JustinParkCS',
            linkedIn: 'https://www.linkedin.com/in/justinparkcs/',
            resume: '',
            portfolio: '',
        },
        {
            authorInitial: 'HN',
            authorName: 'Hafsa Nadim',
            authorBio: 'I am a fullstack software engineer with a passion for learning and building software. I am also learning about machine learning and data science.',
            authorImg: FemaleAvatar,
            gitHub: 'https://github.com/HAFSAnCR7',
            linkedIn: 'https://www.linkedin.com/in/hafsa-nadim-b2385413b/',
            resume: Hafsa_Resume,
            portfolio: '',
        },
        {
            authorInitial: 'TB',
            authorName: 'Tanzil Baraskar',
            authorBio: 'I am a fullstack software engineer with a passion for learning and building software. I am also learning about machine learning and data science.',
            authorImg: MaleAvatar,
            gitHub: 'https://github.com/tanzil7',
            linkedIn: 'https://www.linkedin.com/in/tanzil-b-47855b130/',
            resume: Tanzil_Resume,
            portfolio: '',
        },
        {
            authorInitial: 'DB',
            authorName: 'Dante Betancourt',
            authorBio: 'I am a fullstack software engineer with a passion for learning and building software. I am also learning about machine learning and data science.',
            authorImg: MaleAvatar,
            gitHub: 'https://github.com/DanteB98',
            linkedIn: '',
            resume: '',
            portfolio: '',
        },
        {
            authorInitial: 'IA',
            authorName: 'Ismail Akram',
            authorBio: 'I am a fullstack software engineer with a passion for learning and building software. I am also learning about machine learning and data science.',
            authorImg: MaleAvatar,
            gitHub: 'https://github.com/IsmailAkram',
            linkedIn: '',
            resume: '',
            portfolio: '',
        },
            
    ]
    return (
        <main className=''>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center'>About Us</h1>
                        <p className='text-center'>
                            We are a group of students who are passionate about learning and building software.
                        </p>
                    </div>
                </div>
                <div className='row'>
                    {data.map((item, index) => (
                        <DevInfo key={index} {...item} />
                    ))}
                </div>
            </div>
        </main>
    );
}
