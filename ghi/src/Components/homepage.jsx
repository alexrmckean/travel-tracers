import React, { useState, useEffect } from 'react';
import Infographic from '../images/Infographic.png';

function Homepage() {
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const carouselItems = [
        "https://www.heart.org/-/media/AHA/H4GM/Article-Images/travel.jpg",
        "https://assets-wp.boundless.com/uploads/2023/07/AdobeStock_257988664-scaled.jpeg",
        "https://cdn.contexttravel.com/image/upload/w_1500,q_60/v1691515156/blog/Visa%202024/Blog_Visa_Requirements.jpg",
        "https://images.ctfassets.net/7xz1x21beds9/6ti88738diHVehbHtLqFKr/96016e31860e11929af76b153272c9bd/top-view-travel-elements-collection_23-2148691133.jpg?w=2000&h=1333&fl=progressive&q=90&fm=jpg",
        "https://media.cnn.com/api/v1/images/stellar/prod/istock-1470241971.jpg?c=16x9"
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentItemIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(intervalId); // Cleanup function to clear interval
    }, []);

    return (
        <div>
            <div id="animation-carousel-1" className="relative w-full" data-carousel="slide">
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                    {carouselItems.map((item, index) => (
                        <div key={index} className={`duration-300 ease-linear ${index === currentItemIndex ? 'opacity-100' : 'opacity-0'}`} data-carousel-item={index === currentItemIndex ? 'active' : ''}>
                            <img src={item} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={`Carousel Image ${index}`} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Header */}
            <header className="bg-sky-900 py-4">
                <div className="container mx-auto">
                    <h1 className="mb-4 text-3xl font-extrabold text-white dark:text-white md:text-5xl lg:text-6xl text-center"><span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-white">Access Your Travel Information Instantly: Your Destinations at Your Fingertips</span> Anytime. Anywhere.</h1>
                    <p className="text-white mt-2 text-center pt-3 pb-5">Whether you're embarking on a business trip, planning a family getaway, or craving a quick weekend escape, Travel Tracer swiftly organizes your travel details.</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto mt-8 bg-white">
                {/* About Section */}
                <div className="flex">
                    {/* About Section */}
                    <div className="w-1/2">
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-4xl pt-24 pl-24">All of Your Travel Plans in One Place</h2>
                            <p className="text-gray-700 leading-relaxed text-2xl pl-24">
                                Welcome to Travel Tracer, your all-in-one destination for planning your next adventure. <br /> Easily explore and organize your travel plans with our intuitive platform, ensuring a seamless journey from start to finish!
                            </p>
                        </section>
                    </div>

                    {/* Features Section */}
                    <div className="w-1/2">
                        <section className="mb-8 pl-12">
                            <img src={Infographic} className="full" alt="Infographic"/>
                        </section>
                    </div>
                </div>

                <section className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply" style={{backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/007/771/596/large_2x/commercial-airline-passenger-plane-landing-at-airport-with-beautiful-sunset-sky-and-clouds-arrival-flight-airplane-flying-in-a-line-for-landing-aircraft-open-light-in-the-evening-flight-free-photo.jpg")'}}>
                    <div className="px-4 mx-auto max-w-screen-xl text-center py-10 lg:py-15">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Start Your Journey Planning Today!</h1>
                        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Ready to start planning your next adventure? Sign up now and explore the world like never before!</p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                            <a href="/api/signup" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                                Get started
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>

                <article>
                    <div className="flex items-center mb-4 pt-24">
                        <img className="w-10 h-10 me-4 rounded-full" src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/flower.png" alt=""/>
                        <div className="font-medium dark:text-white">
                            <p>Tootsie Mcgee <time dateTime="2014-08-16 19:00" className="block text-sm text-gray-500 dark:text-gray-400">Joined on Feb 17, 2024</time></p>
                        </div>
                    </div>
                    <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>

                        <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">A must when traveling!</h3>
                    </div>
                    <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400"><p>Reviewed in the United States on <time datetime="2017-03-03 19:00">March 3, 2024</time></p></footer>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">Where do I start? This app has 100% changed the way I travel. Before finding Travel Traver I had no way to organize all of the information for my trips, and now they're all in one convenient place. </p>
                    <p className="mb-3 text-gray-500 dark:text-gray-400">Seriously, if you aren't using Travel Tracer to keep track of all your travel necessities, you're really missing out. HIGHLY recommend!</p>
                    <a href="#" className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read more</a>
                    <aside>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">19 people found this helpful</p>
                        <div className="flex items-center mt-3">
                            <a href="#" className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Helpful</a>
                            <a href="#" className="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600">Report abuse</a>
                        </div>
                    </aside>
                </article>
                <article>
                    <div className="flex items-center mb-4 pt-24">
                        <img className="w-10 h-10 me-4 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_rLEtEDZvPP4iNAAWUgjRpSPI_iSmzqMevQja5JN1QrJO9oTo4tmQ988btOCX0qDbp7Y&usqp=CAU" alt=""/>
                        <div className="font-medium dark:text-white">
                            <p>Spoons Anderson <time datetime="2014-08-16 19:00" className="block text-sm text-gray-500 dark:text-gray-400">Joined on March 19, 2024</time></p>
                        </div>
                    </div>
                    <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>

                        <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">GAMECHANGER!</h3>
                    </div>
                    <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400"><p>Reviewed in the United States on <time datetime="2017-03-03 19:00">March 20, 2024</time></p></footer>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">Let me tell you, I've got 6 kids and the last time we went on vacation at least 2 of them forgot to bring underwear. Talk about a miss. Travel Tracer has a handy little packing list feature where I can keep track of what we need to go on our trip. I can even set a priority for each item, so the most important things (like underwear) are at the top of the list so that they get packed first thing! I won't ever travel without this app! </p>
                    <a href="#" className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Read more</a>
                    <aside>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">52 people found this helpful</p>
                        <div className="flex items-center mt-3">
                            <a href="#" className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Helpful</a>
                            <a href="#" className="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600">Report abuse</a>
                        </div>
                    </aside>
                </article>
            </main>

            {/* Footer */}
            <footer className="bg-sky-900 py-4 mt-20">
                <div className="container mx-auto text-center">
                    <p className="text-white">© 2024 Travel Tracer. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Homepage;
