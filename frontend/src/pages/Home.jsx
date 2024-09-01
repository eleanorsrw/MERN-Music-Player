import { useEffect, useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import CreateSongs from "./CreateSongs"
import PlaySongs from "./PlaySongs"

// problems:
// once you enter a song, you gotta reload the page for it to appear

const Home = () => {

    const [title, setTitle] = useState("")
    const [artist, setArtist] = useState("")
    const [file, setFile] = useState(null)
    const [songs, setSongs] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:5555/songs')
            .then((response) => {
                setSongs(response.data.data) 
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }, [])

    const submitSong = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("artist", artist);
        formData.append("file", file);
        
        axios.post('http://localhost:5555/songs', formData, {
            headers: { "Content-Type": "multipart/form-data"},
        })
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                alert("Error")
                console.log(error)
            })
    }

  return (
    <div className="Home">
        <h1>Music Player</h1>
        <form className="formStyle" onSubmit={submitSong}>
            <h3>Upload a song here!</h3><br/>
            <input
                type="text" 
                className="form-control" 
                placeholder="Artist" 
                required
                onChange={(e) => setArtist(e.target.value)}/>
            <input 
                type="text" 
                className="form-control" 
                placeholder="Song title" 
                required
                onChange={(e) => setTitle(e.target.value)}
                />
            <input 
                type="file" 
                className="form-control" 
                accept=".mp3" 
                required
                onChange={(e) => setFile(e.target.files[0])}
                />
            <br/>
            <button className="button" type="submit">
                Submit
            </button>
        </form>

        <PlaySongs/>


        {/* uploaded songs display table */}
        <table>
            <tbody>
                {songs.map((song, index) => ( 
                    <tr key={song._id}>
                        <td className="border border-slate-700">
                            {index + 1}
                        </td>
                        <td className="border border-slate-700">
                            {song.title}
                        </td>
                        <td className="border border-slate-700">
                            {song.artist}
                        </td>
                        <td className="border border-slate-700">
                            <Link to={`/songs/details/${song._id}`}>
                                <button className="border">Id</button>
                            </Link>
                            <Link to={`/songs/delete/${song._id}`}>
                                <button className="border">Delete</button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Home

