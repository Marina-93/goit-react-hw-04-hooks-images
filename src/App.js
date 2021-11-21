import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import Searchbar from './component/Searchbar/Searchbar';
import ImageGallery from "./component/ImageGallery/ImageGallery";
import Modal from "./component/Modal/Modal";
import Button from "./component/Button/Button";
import './App.css';

export default function App() {
  const [value, setValue] = useState('')
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([])
  const [status, setStatus] = useState('idli')
  const [showModal, setShowModal] = useState(false)
  const [modalSrc, setModalSrc] = useState('')
  const [modalAlt, setModalAlt]=useState('')

  const BaseURL = 'https://pixabay.com/api/'
  const keyURL = '23510997-d251ce775a3590a28eaf32d04'

  const handleFormSubmit = (value) => {
    setValue(value)
  }

  const modalData = (src, alt) => {
    setModalSrc(src)
    setModalAlt(alt)
  }

  const toggleModal = () => {
    setShowModal((prev) => !prev)
  }

  const loadMore = () => {
    setPage((prev) => prev + 1)
    
    fetch(`${BaseURL}?q=${value}&page=${page}&key=${keyURL}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(res => res.json())
      .then((res) => {
        setImages((prevState) => [...prevState, ...res.hits])
        setStatus("resolved")
      })
  }
  
  useEffect(() => {
    if (!value) {
      return;
    }

    setStatus('pending')
    
    fetch(
      `${BaseURL}?q=${value}&page=${page}&key=${keyURL}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then((res) => {
        setImages(res.hits)
        setPage((prev) => prev + 1)
        setStatus('resolved')
      })
  }, [value])

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target.nodeName === 'IMG') {
        toggleModal()
      }
    })
  })

  return (
      <div className='App'>
        <Searchbar onSubmit={handleFormSubmit} />
        {status === 'idli' && <div>Введите назание</div>}
        {status === 'pending' && <Loader className="spin" type="Bars" color="#00BFFF" height={200} width={200} />}
        {status === 'resolved' && <ImageGallery
          images={images}
          showModal={toggleModal}
          modalData={modalData}
        />}
        {images.length !== 0 && <Button onClick={loadMore}/>}
        {showModal && <Modal
          onClose={toggleModal}
          src={modalSrc}
          alt={modalAlt}
        />}
      </div>
    )
}