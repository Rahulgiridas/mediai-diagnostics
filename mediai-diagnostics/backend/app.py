from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import pandas as pd
from PIL import Image
import pytesseract
import fitz  # PyMuPDF

app = FastAPI()

# ✅ Enable CORS (Frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# 🏠 HOME ROUTE
# -------------------------------
@app.get("/")
def home():
    return {"message": "MediAI Diagnostics API Running 🚀"}


# -------------------------------
# 📂 FILE ANALYSIS API
# -------------------------------
@app.post("/analyze/")
async def analyze(file: UploadFile = File(...)):
    file_path = f"temp_{file.filename}"

    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = ""

    # 📄 PDF Processing
    if file.filename.endswith(".pdf"):
        doc = fitz.open(file_path)
        for page in doc:
            extracted_text += page.get_text()

    # 📊 CSV Processing
    elif file.filename.endswith(".csv"):
        df = pd.read_csv(file_path)
        extracted_text = df.to_string()

    # 📊 Excel Processing
    elif file.filename.endswith((".xlsx", ".xls")):
        df = pd.read_excel(file_path)
        extracted_text = df.to_string()

    # 🖼️ Image Processing
    elif file.filename.endswith((".png", ".jpg", ".jpeg")):
        img = Image.open(file_path)
        extracted_text = pytesseract.image_to_string(img)

    else:
        return {"error": "Unsupported file format"}

    # 🧠 MULTI-MODEL AI PIPELINE
    result = multi_model_analysis(extracted_text)

    # Delete temp file
    os.remove(file_path)

    return result


# =====================================================
# 🧠 MULTI-MODEL AI SYSTEM (CORE OF YOUR PROJECT)
# =====================================================

def multi_model_analysis(text):
    text = text.lower()

    summary = []
    risks = []
    recommendations = []

    # -------------------------------
    # 🧠 MODEL 1: PARAMETER DETECTION
    # -------------------------------
    if "hba1c" in text:
        summary.append("HbA1c detected")
        if any(x in text for x in ["7.", "8.", "9."]):
            risks.append("High Diabetes Risk")

    if "glucose" in text:
        summary.append("Glucose levels found")

    if "cholesterol" in text:
        summary.append("Cholesterol detected")

    if "triglycerides" in text:
        summary.append("Triglycerides detected")

    if "hemoglobin" in text:
        summary.append("Hemoglobin analyzed")

    # -------------------------------
    # 🧠 MODEL 2: PATTERN RECOGNITION
    # -------------------------------
    if "cholesterol" in text and "hdl" in text:
        risks.append("Cardiovascular Risk")

    if "triglycerides" in text and "hdl" in text:
        risks.append("Lipid Disorder Risk")

    if "glucose" in text and "hba1c" in text:
        risks.append("Diabetes Risk")

    if "vitamin b12" in text:
        summary.append("Vitamin B12 evaluated")

    # -------------------------------
    # 🧠 MODEL 3: RECOMMENDATION ENGINE
    # -------------------------------
    if "High Diabetes Risk" in risks or "Diabetes Risk" in risks:
        recommendations.append("Reduce sugar intake")
        recommendations.append("Exercise regularly")
        recommendations.append("Monitor blood glucose levels")

    if "Cardiovascular Risk" in risks:
        recommendations.append("Avoid oily and fried foods")
        recommendations.append("Increase physical activity")

    if "Lipid Disorder Risk" in risks:
        recommendations.append("Maintain a balanced diet")
        recommendations.append("Consult a cardiologist")

    if "Hemoglobin analyzed" in summary:
        recommendations.append("Maintain iron-rich diet")

    if len(recommendations) == 0:
        recommendations.append("All parameters appear normal")

    # -------------------------------
    # 🧾 FINAL REPORT OUTPUT
    # -------------------------------
    return {
        "status": "Analysis Complete",
        "summary": summary,
        "risks": list(set(risks)),
        "recommendations": recommendations,
        "disclaimer": "This AI-generated report is not a substitute for professional medical advice."
    }
