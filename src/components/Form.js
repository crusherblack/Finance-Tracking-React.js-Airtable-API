import { useState } from "react";

import Loading from "./Loading";

const Form = ({ addData, postLoading }) => {
  const [type, setType] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    nominal: 0,
  });

  const { name, description, nominal } = form;

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setType("");
    setForm({
      name: "",
      description: "",
      nominal: 0,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    addData({
      name,
      description,
      type,
      nominal: +nominal,
      createdAt: new Date().toISOString(),
    });

    clearForm();
  };

  const typeString =
    type === "Expense" ? "Pengeluaran" : type === "Income" ? "Pemasukan" : "";

  return (
    <div className="col-4">
      <form className="px-2 py-2" onSubmit={onSubmit}>
        <div className="form-group mb-1">
          <label>Pilih Tipe</label>
          <select
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Pilih Tipe</option>
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>
        </div>

        <div className="form-group mb-1">
          <label>Nama {typeString}</label>
          <input
            name="name"
            value={name}
            onChange={onChange}
            type="text"
            className="form-control"
            placeholder={`Nama dari ${typeString}`}
            disabled={!type}
          />
        </div>

        <div className="form-group mb-1">
          <label>Deskripsi</label>
          <textarea
            name="description"
            value={description}
            onChange={onChange}
            className="form-control"
            placeholder={`Inputkan Deskripsi ${typeString}`}
            disabled={!type}
          ></textarea>
        </div>

        <div className="form-group mb-1">
          <label>Nominal</label>
          <input
            name="nominal"
            value={nominal}
            onChange={onChange}
            type="number"
            className="form-control"
            placeholder={`Inputkan Nominal ${typeString}`}
            disabled={!type}
          />
        </div>

        <div className="form-group mb-1 mt-3">
          <button
            className="btn btn-primary w-100"
            disabled={!type || postLoading}
          >
            Simpan {postLoading && <Loading />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
