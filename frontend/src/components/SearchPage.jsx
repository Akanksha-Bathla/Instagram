import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SearchPage = () => {
  const { user } = useSelector((store) => store.auth);
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  // Demo trending destinations
  const trendingDestinations = ['Manali', 'Goa', 'Udaipur', 'Leh', 'Rishikesh'];

  const fetchSearchResults = async () => {
    if (!query.trim()) return;

    try {
      // Dummy API call examples - you can connect to your backend search API
      const res = await axios.get(`http://localhost:8000/api/v1/user/search?query=${query}`, { withCredentials: true });
      setUsers(res.data.users || []);

      // Also fetch destination matching
      const destinationMatches = trendingDestinations.filter(dest =>
        dest.toLowerCase().includes(query.toLowerCase())
      );
      setDestinations(destinationMatches);

      // Save to recent
      setRecentSearches((prev) => [query, ...prev.filter(q => q !== query)].slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSearchResults();
    }, 300); // Debounce 300ms

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="ml-[260px] w-[calc(100%-260px)] min-h-screen bg-gray-50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Search className="w-6 h-6 text-gray-400" />
        <input
          type="text"
          placeholder="Search users, places..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      {/* Recent Searches */}
      {query.trim() === '' && recentSearches.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Recent Searches</h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-200 rounded-full text-sm">{search}</span>
            ))}
          </div>
        </div>
      )}

      {/* Trending Destinations */}
      {query.trim() === '' && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Trending Places</h2>
          <div className="flex flex-wrap gap-4">
            {trendingDestinations.map((place, idx) => (
              <div key={idx} className="p-4 bg-white rounded-lg shadow-md">
                <span className="text-md font-medium">{place}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {query.trim() && (
        <div className="flex flex-col gap-8">
          {/* Users */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Users</h2>
            {users.length > 0 ? (
              <div className="flex flex-col gap-4">
                {users.map((user) => (
                  <Link to={`/profile/${user._id}`} key={user._id} className="flex gap-3 items-center p-3 bg-white rounded-lg hover:shadow-md">
                    <Avatar>
                      <AvatarImage src={user.profilePicture} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{user.username}</h4>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No users found.</p>
            )}
          </div>

          {/* Destinations */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Destinations</h2>
            {destinations.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {destinations.map((dest, idx) => (
                  <div key={idx} className="px-4 py-2 bg-white rounded-lg shadow-md">
                    {dest}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No destinations found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchPage;
