const PersonForm = ({ onSubmit, formValues }) => (
  <form onSubmit={onSubmit}>
    {formValues.map((arr) => (
      <div key={arr.id}>
        {arr.name}{" "}
        <input
          type={arr.type}
          id={arr.id}
          value={arr.value}
          onChange={arr.onchange}
        />
      </div>
    ))}

    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
