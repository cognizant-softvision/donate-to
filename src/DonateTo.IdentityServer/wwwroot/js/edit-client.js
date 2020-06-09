function removeItem(item) {
  $(item).closest("tr").remove();
}

function addItem(propName, element, fieldNames, getListUrl) {
  this.table = $(element).closest("table");
  this.allValues = [];

  let inputs = Array.from(
    $(element).closest("tr").find("input[type=text][name]")
  );
  // gets the input values
  const newValues = {};
  inputs.map((i) => {
    const prefixIndex = i.name.lastIndexOf("__");
    const fieldName =
      prefixIndex > 0 ? i.name.substring(prefixIndex + 2) : i.name;
    newValues[fieldName] = i.value.trimStart(" ").trimEnd(" ");
  });
  this.allValues.push(newValues);

  const tableItems = Array.from($(this.table).find("tr"));
  //gets older values from DOM to avoid cluttering html
  for (const row of tableItems) {
    const rowData = {};
    Array.from($(row).find("input[type=hidden][name]")).forEach(
      (i) => (rowData[i.className] = i.value.trimStart(" ").trimEnd(" "))
    );
    if (Object.keys(rowData).length > 0) {
      this.allValues.push(rowData);
    }
  }

  const params = {
    FieldName: propName,
    Dict: allValues,
    FieldNames: fieldNames,
  };
  const elementBody = $(`#${propName}_table`);
  //replaces old view data
  $.post(getListUrl, params).then((resp) => elementBody.html($(resp).html()));
}
