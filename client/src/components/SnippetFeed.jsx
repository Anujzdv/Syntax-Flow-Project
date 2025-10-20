import React, { useEffect, useState } from 'react';
import api from '../api';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function SnippetFeed() {
  const [snippets, setSnippets] = useState([]);
  const [form, setForm] = useState({ code: '', caption: '' });
  const [error, setError] = useState('');

  const fetchSnippets = () => {
    api.get('/snippets')
      .then((res) => setSnippets(res.data || []))
      .catch(() => setError('Failed to load snippets'));
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  const addSnippet = async (e) => {
    e.preventDefault();
    try {
      await api.post('/snippets/add', form);
      setForm({ code: '', caption: '' });
      fetchSnippets();
    } catch (e) {
      setError('Failed to add snippet');
    }
  };

  const likeSnippet = async (id) => {
    try {
      await api.post(`/snippets/like/${id}`);
      fetchSnippets();
    } catch (e) {
      setError('Failed to like snippet');
    }
  };

  const addComment = async (id, text) => {
    try {
      await api.post(`/snippets/comment/${id}`, { text });
      fetchSnippets();
    } catch (e) {
      setError('Failed to comment');
    }
  };

  return (
    <div>
      <h2>Snippets</h2>
      <form onSubmit={addSnippet} style={{ marginBottom: 16 }}>
        <div>
          <textarea
            placeholder="Write code here..."
            value={form.code}
            onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
            rows={6}
            style={{ width: '100%', fontFamily: 'monospace' }}
          />
        </div>
        <div>
          <input
            placeholder="Caption"
            value={form.caption}
            onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))}
            style={{ width: '100%', marginTop: 8 }}
          />
        </div>
        <button type="submit" style={{ marginTop: 8 }}>Add Snippet</button>
      </form>

      {error && <div style={{ color: 'crimson' }}>{error}</div>}

      {snippets.map((s) => (
        <div key={s._id} style={{ border: '1px solid #eee', borderRadius: 8, marginBottom: 16, padding: 12 }}>
          <div style={{ marginBottom: 8, fontWeight: 600 }}>{s.caption}</div>
          <SyntaxHighlighter language="javascript" style={oneDark}>
            {s.code}
          </SyntaxHighlighter>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={() => likeSnippet(s._id)}>Like ({s.likes})</button>
          </div>
          <div style={{ marginTop: 8 }}>
            <strong>Comments</strong>
            <ul>
              {(s.comments || []).map((c, idx) => (
                <li key={idx}>{c.user || 'Anon'}: {c.text}</li>
              ))}
            </ul>
            <CommentForm onSubmit={(text) => addComment(s._id, text)} />
          </div>
        </div>
      ))}
    </div>
  );
}

function CommentForm({ onSubmit }) {
  const [text, setText] = useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(text); setText(''); }}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a comment" />
      <button type="submit">Post</button>
    </form>
  );
}
