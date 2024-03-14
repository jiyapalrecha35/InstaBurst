import { useEffect } from "react";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";


const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts)
    const token = useSelector((state) => state.token)

    //getFeed posts and get user posts - 2 api calls
    const getPosts = async () => {
        const response = await fetch('/posts',{
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        dispatch(setPosts({ posts: data }))
    }


    const getUserPosts = async () => {
        const response = await fetch(`/posts/${userId}/posts`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        dispatch(setPosts({ posts: data }))
    }



    useEffect(() => {
        if (isProfile)  //get posts corresponding to a particular user
            getUserPosts();
        else          //get all public posts
            getPosts();
    }, [])


    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    );
};
export default PostsWidget;