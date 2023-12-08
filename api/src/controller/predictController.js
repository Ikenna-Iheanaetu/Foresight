export const generalIllnessPredict = async (req, res) => {
  const { resultArray } = req.body;

  if(!resultArray){
    return res.status(400).json({ message: 'The result array was not found' })
  }

  console.log(resultArray);

  const response = await fetch("http://localhost:5000/api/v1/predict/general", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ resultArray }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseData = await response.json();
  console.log(responseData)

  console.log(responseData.predictions);

  return res.status(200).json(responseData.predictions)
};
