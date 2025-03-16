export const formConfig = {
    fields: [
      {
        name: "First Name",
        type: "text",
      },
      {
        name: "Last Name",
        type: "text",
      },
      {
        name: "Email",
        type: "text",  
      },
      {
        name: "Phone Number",
        type: "text",
      
      },
      {
        name: "Product Name",
        type:"text",
        apiOptions:true,
        apiUrl:'https://fakestoreapi.com/products'
      },

      {
        name: "Age",
        type: "text", 
      },
      {
        name: "Category",
        type: "select",
        options: ["Option 1", "Option 2", "Option 3"],
      },
      {
        name: "Gender",
        type: "radio",  
        options: ["Male", "Female", "Other"],
      },
      {
        name: "Subscribe to Newsletter",
        type: "checkbox",
        options: ["Subscribe to receive news and updates"],
      },
     
    ],
  };
  