import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/Dashboard'
import Dashboard2 from './pages/Dashboard2'
import { useEffect, useState } from 'react'
import {
  getProfile,
  getPosts,
  getMyPosts,
  getFollowingPosts
} from './services/userService'
import ProfilePage from './pages/profile/ProfilePage'
import OtherProfile from './pages/otherProfile/OtherProfile'
import ConversationsPage from './pages/conversationsPage/ConversationsPage'
import DMChat from './pages/conversationsPage/DMChat/DMChat'
import Comment from './pages/comment/Comments'
import EdiiteMyProfile from './pages/profile/edite/EditeMyProfile'
function App() {
  const [otherUserId, setOtherUserId] = useState(null)
  const [user, setUser] = useState(null)
  const [dmUser, setDmUser] = useState(null)
  const getUserProfile = async () => {
    try {
      const data = await getProfile()

      setUser(data)
    } catch (error) {
      setUser(null)
      console.log(error)
    }
  }
  const logOut = () => {
    localStorage.removeItem('authToken')
    setUser(null)
  }
  const [Posts, setPosts] = useState(null)
  const getPost = async () => {
    try {
      const postData = await getPosts()
      const sortedPosts = postData.posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      setPosts(sortedPosts)
    } catch (error) {
      setPosts(null)
      console.log(error)
    }
  }

  const [myPosts, setMyPosts] = useState(null)
  const getMyPost = async () => {
    try {
      const postData = await getMyPosts()
      const sortedPosts = postData.posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      setMyPosts(sortedPosts)
    } catch (error) {
      console.log(error)
    }
  }

  const [followingPosts, setFollowingPosts] = useState(null)
  const getFollowingPost = async () => {
    try {
      const postData = await getFollowingPosts()
      const sortedPosts = postData.posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      setFollowingPosts(sortedPosts)
    } catch (error) {
      setPosts(null)
      console.log(error)
    }
  }

  useEffect(() => {
    getUserProfile()
    getPost()
    getMyPost()
    getFollowingPost()
  }, [])

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard/explore"
            element={
              <Dashboard
                user={user}
                logOut={logOut}
                Posts={Posts}
                setPosts={setPosts}
                setOtherUserId={setOtherUserId}
                getPost={getPost}
                getMyPost={getMyPost}
                setMyPosts={setMyPosts}
              />
            }
          />
          <Route
            path="/dashboard/home"
            element={
              <Dashboard2
                user={user}
                logOut={logOut}
                setPosts={setPosts}
                Posts={Posts}
                setOtherUserId={setOtherUserId}
                followingPosts={followingPosts}
                getPost={getPost}
                getMyPost={getMyPost}
                setMyPosts={setMyPosts}
              />
            }
          />
          <Route
            path="/auth/signup"
            element={<Signup getUserProfile={getUserProfile} />}
          />
          <Route
            path="/auth/signin"
            element={<Signin getUserProfile={getUserProfile} />}
          />
          <Route
            path="/:userid/profile"
            element={
              <ProfilePage
                user={user}
                myPosts={myPosts}
                getPost={getPost}
                getFollowingPost={getFollowingPost}
                getMyPost={getMyPost}
              />
            }
          />

          <Route
            path="/profile/user/:userId"
            element={
              <OtherProfile
                user={user}
                myPosts={myPosts}
                otherUserId={otherUserId}
                getPost={getPost}
                getFollowingPost={getFollowingPost}
              />
            }
          />
          <Route
            path="/dm"
            element={
              <ConversationsPage dmUser={dmUser} setDmUser={setDmUser} />
            }
          />
          <Route
            path="/conversations/:convId"
            element={
              <DMChat user={user} dmUser={dmUser} setDmUser={setDmUser} />
            }
          />
          <Route path="/posts/:postId/comments" element={<Comment />} />
          <Route
            path="/edit/profile"
            element={<EdiiteMyProfile user={user} setUser={setUser} />}
          />
        </Routes>
      </main>
    </>
  )
}

export default App
