import React, { memo, useContext, useEffect, useState } from 'react';
import PostCard from "../components/PostCard"
import Post from './Post';
import { SnapContext } from '../context/SnapContext';

const ProfileTabs = ({ postData, userData }) => {
    const [activeTab, setActiveTab] = useState('Posts');
    const tabs = ['Posts', 'Saved', 'Activity'];
    const [currentData, setCurrentData] = useState("")
    const { visible, setVisible } = useContext(SnapContext)

    useEffect(() => {

        if (currentData) {

            const updated = postData.find(item => item._id === currentData._id);
            if (updated && JSON.stringify(updated) !== JSON.stringify(currentData)) {
                setCurrentData(updated);
            }
        }
        

    }, [postData]);


    return postData && (
        <div className="w-full px-11">
            <div className="flex gap-6 text-xl font-semibold border-b w-full border-gray-300">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 ${activeTab === tab
                            ? 'border-b-4 border-black text-black'
                            : 'text-gray-500 hover:text-black'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>


            {/* Optional: Tab Content Area */}
            <div className="mt-6">
                {activeTab === 'Posts' && <div className='grid grid-cols-4 gap-3'>

                    {
                        postData.length > 0 ?
                            postData.map((item, index) => (
                                <div key={index} onClick={() => {
                                    setCurrentData(item);
                                    setVisible(true);
                                }}
                                ><PostCard item={item} /></div>
                            )) : "No Post"
                    }

                </div>}
                {activeTab === 'Saved' && <div>Saved Content</div>}
                {activeTab === 'Activity' && <div>Activity Content</div>}
            </div>
            {visible && <Post userData={userData} postData={currentData} />}
        </div>
    );
};

export default ProfileTabs;
