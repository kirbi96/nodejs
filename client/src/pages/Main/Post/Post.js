import DeleteSvgIcon from "../../../assets/icons/DeleteSvgIcon";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {Api} from "../../../utils/api.hook";

const Post = ({match, history}) =>{
    const auth = useContext(AuthContext)
    const postId = match.params.id
    const [post, setPost] = useState({})
    const [showComments, setShowComments] = useState(true)
    const [showWriteComments, setShowWriteComments] = useState(true)
    const [commentForm, setCommentForm] = useState({
        author: auth?.userId?.email,
        avatar: auth?.userId?.avatar || "https://townsquare.media/site/442/files/2020/01/avatar-10-year.jpg?w=980&q=75",
        commentText: ""
    })

    const getPost = () =>{
        Api.get(`api/post/${postId}`).then((res) => {
            setPost(res.data)
        })
    }

    const deletePost = async id =>{
        try {
            await Api.get(`api/post/delete/${id}`, ).then((res) => {
                if(res.data){
                    history.goBack()
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    const addComment = async id =>{
        try {
            await Api.post(`api/post/comment`, {...commentForm, postId: id}).then((res) => {
                if(res.data){
                    getPost()
                    setCommentForm({...commentForm, commentText: ""})
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    const changeCommentHandler = (e) =>{
        setCommentForm({...commentForm, commentText: e.target.value})
    }

    useEffect(() =>{
        getPost()
    },[])

    return(
        <div>
            <div className="d-flex pb-5">
                <div className="d-flex col-12 flex-column">
                    {post && (
                        <div key={post._id}>
                            <div>
                                <img style={{width: 80, height: 80, borderRadius: 20}} alt="" src={post.avatar}/>
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex">
                                        <div>
                                            <div className="h4">{post.name}</div>
                                            <div style={{fontSize: 14, color: "gray"}}>
                                                {post.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {post.image && post.image.length > 0 && (
                                    <div className="mt-2">
                                        <img style={{width: "100%", height: 300, borderRadius: 5}} alt="" src={post.image}/>
                                    </div>
                                )}
                                {post.video && post.video.length > 0 &&(
                                    <div className="mt-2">
                                        <iframe
                                            width="100%"
                                            height="400"
                                            src={"https://www.youtube.com/embed/" + post.video.split("=")[1]}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        >
                                        </iframe>
                                    </div>
                                )}

                                <div className="mt-4 d-flex flex-row">
                                    <div style={{fontSize: 12, color: "gray"}}>Автор {post.author}</div>
                                    <div className="ml-4 d-flex">
                                        <div className="ml-1" style={{fontSize: 12, color: "white", backgroundColor: "blue", borderRadius: 10, padding: 5}}>
                                            {post.tag}
                                        </div>
                                    </div>
                                    <div style={{marginLeft: "auto", marginRight: 0}} className="d-flex">
                                        <div style={{cursor: "pointer"}} onClick={() => deletePost(post._id)} className="ml-2">
                                            <DeleteSvgIcon/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <div className="d-flex">
                                    <div
                                        onClick={() => setShowComments(s => !s)}
                                        style={{fontSize: 12, color: "gray", cursor: "pointer"}}
                                    >
                                        {showComments ? "Скрыть комментарии" : "Показать коментарии"}
                                    </div>
                                    <div
                                        className="ml-2"
                                        onClick={() => setShowWriteComments(s => !s)}
                                        style={{fontSize: 12, color: "gray", cursor: "pointer"}}
                                    >
                                        Написать коментарий
                                    </div>
                                </div>
                                {showWriteComments && (
                                    <div className="mt-3 d-flex mb-2">
                                        <div style={{marginLeft: -15}} className="col-10">
                                            <input
                                                className="col-12"
                                                name="commentText"
                                                value={commentForm.commentText}
                                                type="text"
                                                onChange={changeCommentHandler}
                                            />
                                        </div>
                                        <div onClick={() => addComment(post._id)} style={{fontSize: 12}} className="col-2 btn btn-dark">
                                            Отправить
                                        </div>
                                    </div>
                                )}
                                {showComments && (
                                    <>
                                        {post.commentsArr && post.commentsArr.length > 0 ? (
                                            <>
                                                {post.commentsArr.map( comm => (
                                                    <div className="mt-3 d-flex mb-3" key={comm._id}>
                                                        <img
                                                            style={{width: 35, height: 35, borderRadius: 20}}
                                                            alt=""
                                                            src={comm.avatar}
                                                        />
                                                        <div className="ml-2">
                                                            <div style={{fontSize: 12}}>{comm.author}</div>
                                                            <div style={{fontSize: 12, color: "gray"}}>{comm.commentText}</div>
                                                        </div>
                                                    </div>
                                                ))}

                                            </>
                                        ) : (
                                            <>комментариев нет</>
                                        )}

                                    </>
                                )}

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}



export default Post
