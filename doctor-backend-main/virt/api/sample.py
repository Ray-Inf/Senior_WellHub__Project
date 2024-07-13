import fitz  # PyMuPDF
import re

def extract_text_from_pdf(pdf_path):
    text = ""
    with fitz.open(pdf_path) as pdf_document:
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            text += page.get_text()
    return text

pdf_path = "C:\\Users\\M JAGAN\\OneDrive\\Documents\\new.pdf"
pdf_text = extract_text_from_pdf(pdf_path)
def extract_medicines_data(text):
    # Define a regex pattern to match the lines with medicine data
    # This pattern assumes that each line contains four fields separated by commas
    pattern = re.compile(r'(?P<generic_name>[^,]+),\s*(?P<pack>[^,]+),\s*(?P<retail_price>[^,]+),\s*(?P<trade_price>[^,]+)')
    matches = pattern.finditer(text)
    
    medicines = []
    for match in matches:
        medicines.append({
            'generic_name': match.group('generic_name').strip(),
            'pack': match.group('pack').strip(),
            'retail_price': match.group('retail_price').strip(),
            'trade_price': match.group('trade_price').strip(),
        })
        return(medicines)
print(pdf_text)
  
