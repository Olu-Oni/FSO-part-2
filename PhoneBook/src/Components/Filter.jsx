const Filter = ({ text, onChange }) => (
  <div>
    {text}
    <input onChange={onChange} />
  </div>
);

export default Filter;
