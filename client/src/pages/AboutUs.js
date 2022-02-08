import React from 'react';
import DevInfo from '../components/DevInfo';

export default function AboutUs() {
    const data = [
        {
            authorInitial: 'TT',
            authorName: 'Tenzin Tashi',
            authorBio: 'I am a fullstack software engineer with a passion for learning and building software. I am also learning about machine learning and data science.',
            authorImg: 'https://source.unsplash.com/random',
            gitHub: 'https://github.com/tenzin1308',
            linkedIn: 'https://www.linkedin.com/in/tenzin-tashi-bb520510a/',
            resume: '',
            portfolio: '',
        },
        {
            authorInitial: 'JP',
            authorName: 'Justin Park',
            authorBio: 'I am a fullstack software engineer with a passion for learning and building software. I am also learning about machine learning and data science.',
            authorImg: 'https://source.unsplash.com/random',
            gitHub: 'https://github.com/JustinParkCS',
            linkedIn: 'https://www.linkedin.com/in/justinparkcs/',
            resume: '',
            portfolio: '',
        },
        {
            authorInitial: 'HN',
            authorName: 'Hafsa Nadim',
            authorBio: 'I am a fullstack software engineer with a passion for learning and building software. I am also learning about machine learning and data science.',
            authorImg: 'https://source.unsplash.com/random',
            gitHub: 'https://github.com/HAFSAnCR7',
            linkedIn: 'https://www.linkedin.com/in/hafsa-nadim-b2385413b/',
            resume: '',
            portfolio: '',
        },
        {
            authorInitial: 'TB',
            authorName: 'Tanzil Baraskar',
            authorBio: 'I am a fullstack software engineer with a passion for learning and building software. I am also learning about machine learning and data science.',
            authorImg: 'https://source.unsplash.com/random',
            gitHub: 'https://github.com/tanzil7',
            linkedIn: 'https://www.linkedin.com/in/tanzil-b-47855b130/',
            resume: '',
            portfolio: '',
        },
        {
            authorInitial: 'DB',
            authorName: 'Dhante B',
            authorBio: 'I am a fullstack software engineer with a passion for learning and building software. I am also learning about machine learning and data science.',
            authorImg: 'https://source.unsplash.com/random',
            gitHub: '',
            linkedIn: '',
            resume: '',
            portfolio: '',
        },
        {
            authorInitial: 'IA',
            authorName: 'Ismail A',
            authorBio: 'I am a fullstack software engineer with a passion for learning and building software. I am also learning about machine learning and data science.',
            authorImg: 'https://source.unsplash.com/random',
            gitHub: '',
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
