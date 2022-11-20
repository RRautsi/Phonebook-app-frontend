const PersonForm = (props) => {
  const {
    newName,
    newNumber,
    handleName,
    handleNumber,
    addNew,
  } = props;

  return (
    <form onSubmit={addNew}>
      <div className="grid gap-1 mb-2">
        <p>Name:</p> <input value={newName} onChange={handleName} className="input-style"/>
        <br />
        Number: <input value={newNumber} onChange={handleNumber} className="input-style"/>
      </div>
      <div className="pt-1 pb-5">
        <button type="submit" className="button-custom relative h-6 w-64 md:w-80 text-md">Add</button>
      </div>
    </form>
  );
};

export default PersonForm;
