# from flask import Flask, request, jsonify, make_response
# from flask_cors import CORS
# import pandas as pd
# import os

# app = Flask(__name__)
# CORS(app, resources={r"/*":{"origins":"*"}})

# CSV_FILE = 'donor_data.csv'

# # Function to process the CSV and handle donation count and donor ID
# def process_donations(donation_data):
#     # Check if CSV exists, create it if not
#     if not os.path.exists(CSV_FILE):
#         columns = [
#             "DONOR ID", "DONATION TYPE", "ORGANIZATION NAME", "LAST NAME", "FIRST NAME (DONOR OR CONTACT)", 
#             "TITLE", "GENDER", "ADDRESS", "CITY/TOWN", "COUNTRY", "MOBILE PHONE", "WHATSAPP NO", "EMAIL(1)", 
#             "EMAIL(2)", "JOB TITLE", "EMPLOYER", "DONOR CATEGORY", "TRADITIONAL TITLE", "DONATION COUNT", 
#             "DONATION DATE", "PAYMENT METHOD", "CURRENCY", "AMOUNT", "REFERENCE", "RECEIPT NO", 
#             "DESCRIPTION (IN-KIND)", "CAMPAIGN EVENT", "REFERRED BY", "DATA ENTRY DATE", "Money Received By", 
#             "DATA ENTRY NAME"
#         ]
#         df = pd.DataFrame(columns=columns)
#         df.to_csv(CSV_FILE, index=False)

#     # Load existing data from the CSV
#     df = pd.read_csv(CSV_FILE)

#     # Extract the key columns to check uniqueness
#     group_columns = ['FIRST NAME (DONOR OR CONTACT)', 'LAST NAME', 'ORGANIZATION NAME']

#     # Check if donor already exists
#     donor_exists = df[
#         (df['FIRST NAME (DONOR OR CONTACT)'] == donation_data['firstName']) &
#         (df['LAST NAME'] == donation_data['lastName']) &
#         (df['ORGANIZATION NAME'] == donation_data['orgName'])
#     ]

#     if not donor_exists.empty:
#         # If donor exists, find the donor ID and increment donation count
#         donor_id = donor_exists['DONOR ID'].iloc[0]
#         df.loc[df['DONOR ID'] == donor_id, 'DONATION COUNT'] += 1
#     else:
#         # Create a new DONOR ID and add the donation count
#         donor_id = int(df['DONOR ID'].max()) + 1 if not df.empty else 1
#         donation_data['DONOR ID'] = donor_id
#         donation_data['DONATION COUNT'] = 1
#         new_donation = pd.DataFrame([donation_data])  # Wrap in a DataFrame
#         df = pd.concat([df, new_donation], ignore_index=True)  # Use pd.concat

#     # Save the updated data back to the CSV
#     df.to_csv(CSV_FILE, index=False)
# @app.after_request
# def add_cors_headers(response):
#     response.headers['Access-Control-Allow-Origin'] =  '*'
#     response.headers['Access-Control-Allow-Headers'] =  'Content-Type, Authorization'
#     response.headers['Access-Control-Allow-Methods'] =  'OPTIONS, GET, POST'
#     return response

# @app.route('/submit_donation', methods=['POST', 'OPTIONS'])
# def submit_donation():
#     if request.method == 'OPTIONS':
#         response = make_response()
#         response.headers['Access-Control-Allow-Origin'] =  '*'
#         response.headers['Access-Control-Allow-Headers'] =  'Content-Type, Authorization'
#         response.headers['Access-Control-Allow-Methods'] =  'OPTIONS, POST'
#         return response
#     donation_data = request.json
#     process_donations(donation_data)
#     return jsonify({'message': 'Donation Recorded Successful'}), 200

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)

# Enable CORS for all routes and origins
CORS(app, resources={r"/*": {"origins": "*"}})

CSV_FILE = 'donor_data.csv'

# Load the CSV file (create it if it doesn't exist)
if not os.path.exists(CSV_FILE):
    # Example: Existing headers in your file
    headers = [
        "DONOR ID", "DONATION TYPE", "ORGANIZATION NAME", "LAST NAME", 
        "FIRST NAME (DONOR OR CONTACT)", "TITLE", "GENDER", "ADDRESS", 
        "CITY/TOWN", "COUNTRY", "MOBILE PHONE", "WHATSAPP NO", "EMAIL(1)", 
        "EMAIL(2)", "JOB TITLE", "EMPLOYER", "DONOR CATEGORY", "TRADITIONAL TITLE", 
        "DONATION DATE", "PAYMENT METHOD", "CURRENCY", 
        "AMOUNT", "REFERENCE", "RECEIPT NO", "DESCRIPTION (IN-KIND)", 
        "CAMPAIGN EVENT", "REFERRED BY", "DATA ENTRY DATE", "Money Received By", 
        "DATA ENTRY NAME"
    ]
    pd.DataFrame(columns=headers).to_csv(CSV_FILE, index=False)

# Handle preflight OPTIONS requests
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'OPTIONS, GET, POST'
    return response

# Process donation data and map to existing headers
def process_donation(data):
    # Load the CSV
    df = pd.read_csv(CSV_FILE)

    # Map incoming data to corresponding headers in the CSV
    row_data = {
        "DONATION TYPE": data.get("donationType"),
        "ORGANIZATION NAME": data.get("orgName"),
        "LAST NAME": data.get("lastName"),
        "FIRST NAME (DONOR OR CONTACT)": data.get("firstName"),
        "TITLE": data.get("title"),
        "GENDER": data.get("gender"),
        "ADDRESS": data.get("address"),
        "CITY/TOWN": data.get("city"),
        "COUNTRY": data.get("country"),
        "MOBILE PHONE": data.get("mobile"),
        "WHATSAPP NO": data.get("whatsapp"),
        "EMAIL(1)": data.get("email"),
        "EMAIL(2)": data.get("email_2"),
        "JOB TITLE": data.get("jobTitle"),
        "EMPLOYER": data.get("employer"),
        "DONOR CATEGORY": data.get("donorCategory"),
        "TRADITIONAL TITLE": data.get("traditionalTitle"),
        "DONATION DATE": data.get("donationDate"),
        "PAYMENT METHOD": data.get("paymentMethod"),
        "CURRENCY": data.get("currency"),
        "AMOUNT": data.get("amount"),
        "REFERENCE": data.get("reference"),
        "RECEIPT NO": data.get("receiptNo"),
        "DESCRIPTION (IN-KIND)": data.get("description"),
        "CAMPAIGN EVENT": data.get("campaignEvent"),
        "REFERRED BY": data.get("referredBy"),
        "DATA ENTRY DATE": data.get("registryDate"),
        "Money Received By": data.get("moneyReceivedBy"),
        "DATA ENTRY NAME": data.get("recorder"),
    }

    # Check if donor already exists based on first name, last name, and donation type
    if row_data["DONATION TYPE"].lower() == "individual":
        existing_donor = df[
            (df['FIRST NAME (DONOR OR CONTACT)'] == row_data["FIRST NAME (DONOR OR CONTACT)"]) &
            (df['LAST NAME'] == row_data["LAST NAME"]) &
            (df['DONATION TYPE'].str.lower() == "individual")
        ]
    elif row_data["DONATION TYPE"].lower() == "organization":
        existing_donor = df[
            (df['FIRST NAME (DONOR OR CONTACT)'] == row_data["FIRST NAME (DONOR OR CONTACT)"]) &
            (df['LAST NAME'] == row_data["LAST NAME"]) &
            (df['DONATION TYPE'].str.lower() == "organization") &
            (df['ORGANIZATION NAME'] == row_data["ORGANIZATION NAME"])
        ]
    else:
        existing_donor = pd.DataFrame()

    if not existing_donor.empty:
        # Reuse existing DONOR ID
        donor_id = existing_donor['DONOR ID'].iloc[0]
    else:
        # Generate a new DONOR ID
        donor_id = int(df['DONOR ID'].max()) + 1 if not df.empty else 1

    # Assign DONOR ID to the new donation entry
    row_data["DONOR ID"] = donor_id

    # Append the new donation entry to the dataframe
    new_row = pd.DataFrame([row_data])
    df = pd.concat([df, new_row], ignore_index=True)

    # Save the updated data back to the CSV
    df.to_csv(CSV_FILE, index=False)

    print(f"Donation recorded for donor ID {donor_id}")


# Route to handle donation submission
@app.route('/submit_donation', methods=['POST', 'OPTIONS'])
def submit_donation():
    if request.method == 'OPTIONS':
        # Handle preflight requests
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Methods'] = 'OPTIONS, POST'
        return response

    # Parse incoming JSON data
    donation_data = request.json
    process_donation(donation_data)

    return jsonify({"message": "Donation recorded successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True)
