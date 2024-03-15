// Homepage.js

import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
    return (
        <div>
            {/* Header */}
            <header className="bg-blue-500 py-4">
                <div className="container mx-auto">
                    <h1 className="text-white text-3xl font-bold">Welcome to Your Travel App</h1>
                    <p className="text-white mt-2">Plan your dream trips with ease!</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto mt-8">
                {/* About Section */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">About Our App</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut lobortis velit.
                        Vivamus vel neque eget libero interdum consectetur. Fusce elementum dui in nunc
                        vehicula, vel scelerisque magna accumsan.
                    </p>
                </section>

                {/* Features Section */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Plan and organize your trips hassle-free</li>
                        <li>Discover popular destinations worldwide</li>
                        <li>Find the best deals on flights and accommodations</li>
                        <li>Share your itineraries with friends and family</li>
                    </ul>
                </section>

                {/* Get Started Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Get Started Today!</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Ready to start planning your next adventure? Sign up now and explore the world
                        like never before!
                    </p>
                    <Link to="/api/signup" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block">
                        Sign Up
                    </Link>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-200 py-4 mt-8">
                <div className="container mx-auto text-center">
                    <p className="text-gray-600">© 2024 Your Travel App. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Homepage;
