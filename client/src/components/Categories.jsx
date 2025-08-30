import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Categories = () => {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/quiz/master_category/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, [])

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Choose a Category</h2>
      <div className="list-group">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="list-group-item list-group-item-action"
            onClick={() => navigate(`/quiz/${cat.id}/`)}
          >
            {cat.title} ({cat.totalTime} mins)
          </button>
        ))}
      </div>
    </div>
  )
}

export default Categories