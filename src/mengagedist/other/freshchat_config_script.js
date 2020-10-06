// Configuration tool https://freshchat.xyz/home/-Lyn5DbAQVZf5JBBfMHL
fcPreChatFormData = {
  //Form header color and Submit button color.
  mainbgColor: '#6BC6D7',
  //Form Header Text and Submit button text color.
  maintxColor: '#fff',
  //Chat Form Title
  title: 'Skayle Support',
  //Chat form Welcome Message
  textBanner: "We can't wait to talk to you. But first, please take a couple of moments to tell us a bit about yourself.",
  //Name field Label
  nameLabel: 'Name',
  //Set reqName as 'required' if you want the name field to be mandatory.
  reqName: 'required',
  //If name field is set as mandatory, then the below message will be displayed if the field value is not valid or empty.
  nameError: 'Please enter a valid name :)',
  //To not display the Email, set the value to 'no'
  showEmail: 'yes',
  //Email field label
  emailLabel: 'E-mail',
  //Set reqEmail as 'required' if you want the field to be mandatory.
  reqEmail: 'required',
  //If email field is set as mandatory, then the below message will be displayed if the field value is not valid or empty.
  emailError: 'Please enter a valid email.',
  //To not display the Phone, set the value to 'no'
  showPhone: 'yes',
  //Phone Field Label
  phoneLabel: 'Mobile',
  //Set reqPhone as 'required' if you want the field to be mandatory.
  reqPhone: 'required',
  //If phone field is set as mandatory, then the below message will be displayed if the field value is not valid or empty.
  phoneError: 'Please enter a valid contact number',
  //Submit Button Label.
  SubmitLabel: 'Start Chat'
};
window.fcSettings = {
  token: '9c6c896f-0106-49c6-84a5-e80221d1150b',
  host: "https://wchat.freshchat.com",
  config: {
    cssNames: {
      //The below element is mandatory. Please add any custom class or leave the default.
      widget: 'my_custom_fc_frame',
      //The below element is mandatory. Please add any custom class or leave the default.
      expanded: 'custom_fc_expanded'
    },
    "headerProperty": {
      "backgroundColor": "#6BC6D7",
      "appName": "Skayle Support"
    }
  },
  onInit: function() {
    console.log('widget init');
    fcPreChatform.fcWidgetInit(fcPreChatFormData);
  }
};
