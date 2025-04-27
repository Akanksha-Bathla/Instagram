import React, { useState } from 'react';

const ExploreDestinations = () => {
  const [filter, setFilter] = useState('');
  const [liked, setLiked] = useState({});

  const destinations = [
    { id: 'udaipur', title: 'Udaipur, Rajasthan', description: 'The City of Lakes, rich in heritage and beauty.', image: 'https://www.agoda.com/wp-content/uploads/2024/09/Featured-image-Udaipur-City-Palace-beside-Lake-Pichola-at-Udaipur-Rajasthan-India-1244x700.jpg' },
    { id: 'pondicherry', title: 'Pondicherry', description: 'French lanes, seaside cafes, and soul-soothing sunsets.', image: 'https://hikerwolf.com/wp-content/uploads/2020/03/WhatsApp-Image-2020-03-31-at-3.18.20-PM-1.jpeg' },
    { id: 'manali', title: 'Manali, Himachal Pradesh', description: 'Snowy peaks, pine trees, and mountain magic.', image: 'https://www.tripsavvy.com/thmb/LHDA0SsiVcQ07Ptf3zQBFdr1xhA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-148864437-5ae5850a8e1b6e003704971f.jpg' },
    { id: 'jaipur', title: 'Jaipur, Rajasthan', description: 'Royal forts, pink streets, and timeless charm.', image: 'https://s7ap1.scene7.com/is/image/incredibleindia/hawa-mahal-jaipur-rajasthan-city-1-hero?qlt=82&ts=1726660605161' },
    { id: 'leh', title: 'Leh, Ladakh', description: 'Barren beauty, starlit skies, and Himalayan silence.', image: 'https://turuhi.com/storage/story/Title-Leh-City-Himalayas.jpg' },
    { id: 'rishikesh', title: 'Rishikesh, Uttrakhand', description: 'River rapids, yoga flows, and mountain chants.', image: 'https://www.vivantahotels.com/content/dam/seleqtions/pilibhit-house/image/Haridwar.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg' },
    { id: 'varanasi', title: 'Varanasi, Uttar Pradesh', description: 'Spiritual essence on the banks of River Ganga.', image: 'https://www.letsgoforacamp.com/wp-content/uploads/2024/09/resize_Varanasi-image2.jpg' },
    { id: 'ooty', title: 'Ooty, Tamil Nadu', description: 'Tea gardens, toy trains, and misty mornings.', image: 'https://www.thehosteller.com/_next/image/?url=https%3A%2F%2Fstatic.thehosteller.com%2Fhostel%2Fimages%2FFeatured%20Image%20(1).jpg%2FFeatured%20Image%20(1)-1678277258513.jpg&w=2048&q=75' },
    { id: 'goa', title: 'Goa', description: 'Sunsets, beaches, and vibrant vibes.', image: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2024/04/15151106/palm-beach-1-1600x900.jpeg' },
  ];

  const handleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = () => {
    alert('Shared to your feed!');
  };

  return (
    <div className="ml-[260px] px-4 sm:px-6 py-6 w-[calc(100%-260px)] min-h-screen overflow-hidden bg-white text-black font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">Explore Destinations</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {['udaipur', 'pondicherry', 'manali', 'jaipur', 'leh', 'varanasi', 'ooty', 'goa', 'rishikesh'].map(loc => (
          <button
            key={loc}
            onClick={() => setFilter(loc)}
            className={`py-2 px-4 rounded-full font-semibold transition 
              ${filter === loc ? 'bg-white text-black hover:bg-green-300'  : 'bg-gray-800 text-white hover:bg-green-600'}`}
          >
            {loc.charAt(0).toUpperCase() + loc.slice(1)}
          </button>
        ))}
      </div>

      {/* Destinations Reels */}
      <div className="h-[calc(100vh-200px)] overflow-y-scroll scroll-smooth scroll-snap-y mandatory">
        {destinations.filter(dest => filter === '' || dest.id === filter).map(dest => (
          <div key={dest.id} className="relative h-[90vh] scroll-snap-start flex flex-col justify-end items-start p-6">
            <img
              src={dest.image}
              alt={dest.title}
              className="absolute inset-0 w-full h-full object-cover brightness-75"
            />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-white">{dest.title}</h2>
              <p className="mb-4 text-white">{dest.description}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleLike(dest.id)}
                  className="bg-white text-black font-semibold px-4 py-2 rounded"
                >
                  {liked[dest.id] ? '❤️ Liked' : '🤍 Like'}
                </button>
                <button
                  onClick={handleShare}
                  className="bg-white text-black font-semibold px-4 py-2 rounded"
                >
                  🔗 Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreDestinations;
