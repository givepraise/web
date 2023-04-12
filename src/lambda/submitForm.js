const hubspot = require("@hubspot/api-client");

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const data = JSON.parse(event.body);

  const { company, website, firstname, email } = data;

  const errors = {};

  if (!company || company.trim() === "") {
    errors.company = "Community name is required";
  }

  if (!website || website.trim() === "") {
    errors.website = "Website is required";
  }

  if (!firstname || firstname.trim() === "") {
    errors.firstname = "Coontact name is required";
  }

  if (!email || email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email is not valid";
  }

  if (Object.keys(errors).length > 0) {
    return {
      statusCode: 400,
      body: JSON.stringify(errors),
    };
  }

  const hubspotClient = new hubspot.Client({
    accessToken: HUBSPOT_ACCESS_TOKEN,
  });

  try {
    const response = await hubspotClient.crm.contacts.basicApi.create({
      properties: data,
    });
    return {
      statusCode: 200,
      body: "Form submitted successfully",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "An error occurred while submitting the form",
    };
  }
};
