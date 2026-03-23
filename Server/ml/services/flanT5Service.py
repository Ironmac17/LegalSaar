import os
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Disable parallelism and threading to avoid macOS mutex issues
os.environ["TOKENIZERS_PARALLELISM"] = "false"
os.environ["OMP_NUM_THREADS"] = "1"
os.environ["MKL_NUM_THREADS"] = "1"
os.environ["NUMEXPR_NUM_THREADS"] = "1"
os.environ["OPENBLAS_NUM_THREADS"] = "1"
torch.set_num_threads(1)

class FlanT5Service:
    def __init__(self):
        # Load FLAN-T5-small model using Auto classes for better compatibility
        self.tokenizer = AutoTokenizer.from_pretrained('google/flan-t5-small')
        self.model = AutoModelForSeq2SeqLM.from_pretrained('google/flan-t5-small', use_safetensors=False).to('cpu')

    def generate_answer(self, question, context):
        # Prepare input
        input_text = f"question: {question} context: {context}"

        # Tokenize
        inputs = self.tokenizer(input_text, return_tensors="pt", max_length=512, truncation=True)

        # Generate
        outputs = self.model.generate(
            inputs['input_ids'],
            max_length=200,
            num_beams=4,
            early_stopping=True
        )

        # Decode
        answer = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return answer

# Singleton instance
flan_t5 = FlanT5Service()

def generate_answer(question, context):
    return flan_t5.generate_answer(question, context)