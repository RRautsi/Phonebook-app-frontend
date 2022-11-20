const FilterForm = (props) => {
  const { filterValue, handleFilter, title } = props;
  return (
    <div className="flex justify-center">
      <input value={filterValue} title={title} onChange={handleFilter} className="input-style" />
    </div>
  );
};

export default FilterForm;
