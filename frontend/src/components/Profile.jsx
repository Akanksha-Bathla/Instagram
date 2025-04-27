import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle } from 'lucide-react';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile, user } = useSelector(store => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="ml-[260px] w-[calc(100%-260px)] min-h-screen flex justify-center bg-gray-50 overflow-x-hidden">
      <div className="max-w-5xl w-full px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Avatar */}
          <div className="flex justify-center items-center">
            <Avatar className="h-32 w-32">
              <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          {/* Right: Profile Info */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-2xl font-semibold">{userProfile?.username}</span>
              {isLoggedInUserProfile ? (
                <>
                  <Link to="/account/edit">
                    <Button variant="secondary" className="h-8">Edit Profile</Button>
                  </Link>
                  <Button variant="secondary" className="h-8">View Archive</Button>
                  <Button variant="secondary" className="h-8">Ad Tools</Button>
                </>
              ) : (
                isFollowing ? (
                  <>
                    <Button variant="secondary" className="h-8">Unfollow</Button>
                    <Button variant="secondary" className="h-8">Message</Button>
                  </>
                ) : (
                  <Button className="bg-[#0095F6] hover:bg-[#3192d2] h-8">Follow</Button>
                )
              )}
            </div>

            <div className="flex gap-6 text-gray-600 text-sm">
              <p><span className="font-bold">{userProfile?.posts.length}</span> posts</p>
              <p><span className="font-bold">{userProfile?.followers.length}</span> followers</p>
              <p><span className="font-bold">{userProfile?.following.length}</span> following</p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-semibold">{userProfile?.bio || 'bio here...'}</span>
              <Badge className="w-fit" variant="secondary">
                <AtSign className="w-4 h-4" /> 
                <span className="pl-1">{userProfile?.username}</span>
              </Badge>
              <span>🌍 Turning travels into stories</span>
              <span>🌍 Solo trips, endless memories</span>
              <span>🌍 Code your journey, travel your dreams</span>
              <span>🌍 DM to explore solo adventures together</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 border-t border-gray-300 pt-6">
          <div className="flex justify-center gap-10 text-sm mb-8">
            <span 
              className={`cursor-pointer ${activeTab === 'posts' ? 'font-bold border-b-2 border-black' : ''}`} 
              onClick={() => handleTabChange('posts')}>
              POSTS
            </span>
            <span 
              className={`cursor-pointer ${activeTab === 'saved' ? 'font-bold border-b-2 border-black' : ''}`} 
              onClick={() => handleTabChange('saved')}>
              SAVED
            </span>
            <span className="cursor-pointer text-gray-500">REELS</span>
            <span className="cursor-pointer text-gray-500">TAGS</span>
          </div>

          {/* Posts */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {displayedPost?.map((post) => (
              <div key={post?._id} className="relative group cursor-pointer">
                <img src={post.image} alt="postimage" className="rounded-sm w-full aspect-square object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-6 text-white text-lg">
                    <button className="flex items-center gap-2 hover:text-gray-300">
                      <Heart className="w-5 h-5" />
                      <span>{post?.likes.length}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-gray-300">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post?.comments.length}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
