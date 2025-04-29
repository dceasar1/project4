import React, { useState, useEffect } from 'react';
import './category.css';

const Category = () => {
  const fixedCategories = [
    { id: 'frontend', name: 'Subscriptions' },
    { id: 'backend', name: 'Backend' },
    { id: 'database', name: 'Database' },
    { id: 'devops', name: 'DevOps' }
  ];

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (selectedCategoryId) {
      // Replace this with real API call if needed
      fetch(`http://localhost:5000/api/categories/${selectedCategoryId}/questions`)
        .then(res => res.json())
        .then(data => setQuestions(data))
        .catch(err => console.error('Error fetching questions:', err));
    }
  }, [selectedCategoryId]);

  return (
    <div className="category-container">
      <div className="sidebar">
        <h2>Categories</h2>
        <ul>
          {fixedCategories.map(cat => (
            <li
              key={cat.id}
              className={selectedCategoryId === cat.id ? 'active' : ''}
              onClick={() => setSelectedCategoryId(cat.id)}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="content">
        {selectedCategoryId ? (
          <>
            <h2>Questions in {fixedCategories.find(c => c.id === selectedCategoryId)?.name}</h2>
            {questions.length > 0 ? (
              <ul className="question-list">
                {questions.map((q, index) => (
                  <li key={index} className="question-card">
                    <h3>{q.title}</h3>
                    <p>{q.body}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No questions in this category.</p>
            )}
          </>
        ) : (
          <p className="placeholder">Select a category to view its questions.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
