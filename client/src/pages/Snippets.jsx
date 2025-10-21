import React, { useEffect, useState } from 'react';
import { snippetApi } from '../services/api';

export default function Snippets() {
  const [language, setLanguage] = useState('');
  const [snippets, setSnippets] = useState([]);
  const [form, setForm] = useState({ title: '', language: '', code: '', description: '' });

  const load = async () => {
    const res = await snippetApi.list({ language: language || undefined });
    setSnippets(res);
  };

  useEffect(() => {
    load();
  }, [language]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const create = async (e) => {
    e.preventDefault();
    await snippetApi.create({ ...form, author: 'anonymous' });
    setForm({ title: '', language: '', code: '', description: '' });
    await load();
  };

  const like = async (id) => {
    await snippetApi.like(id);
    await load();
  };

  return (
    <div className="row g-4">
      <div className="col-md-5">
        <h3>Create Snippet</h3>
        <form onSubmit={create} className="card card-body">
          <div className="mb-2">
            <label className="form-label">Title</label>
            <input className="form-control" name="title" value={form.title} onChange={onChange} required />
          </div>
          <div className="mb-2">
            <label className="form-label">Language</label>
            <select className="form-select" name="language" value={form.language} onChange={onChange} required>
              <option value="">Select</option>
              {['C', 'C++', 'Python', 'Java', 'JavaScript'].map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="mb-2">
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" value={form.description} onChange={onChange} />
          </div>
          <div className="mb-2">
            <label className="form-label">Code</label>
            <textarea className="form-control" name="code" value={form.code} onChange={onChange} rows={6} required />
          </div>
          <button className="btn btn-primary">Save</button>
        </form>
      </div>
      <div className="col-md-7">
        <div className="d-flex gap-2 align-items-center mb-2">
          <h3 className="mb-0">Snippets</h3>
          <select className="form-select w-auto" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="">All</option>
            {['C', 'C++', 'Python', 'Java', 'JavaScript'].map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        {snippets.map((s) => (
          <div className="card mb-3" key={s._id}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{s.title} <small className="text-muted">({s.language})</small></h5>
                  <p className="mb-2">{s.description}</p>
                </div>
                <button className="btn btn-sm btn-outline-primary" onClick={() => like(s._id)}>Like ({s.likes})</button>
              </div>
              <pre className="bg-light p-3 mt-2" style={{ whiteSpace: 'pre-wrap' }}>{s.code}</pre>
            </div>
          </div>
        ))}
        {!snippets.length && <p>No snippets yet.</p>}
      </div>
    </div>
  );
}
