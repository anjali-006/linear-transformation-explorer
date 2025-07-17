
# Rank-Nullity Visualizer

An interactive Python-based visualization tool to help students understand key concepts in Linear Algebra such as:

- Rank
- Nullity
- Kernel
- Range
- Linear Transformations

This tool provides visual and numerical demonstrations of the Rank-Nullity Theorem, using user-defined matrices and vectors.

## Features

- Accepts user-defined matrices
- Computes and displays:
  - Rank
  - Nullity
  - Kernel
  - Range
- Applies linear transformations
- Visualizes vectors before and after transformation (using Matplotlib/Plotly)
- Intuitive interface with real-time updates

## Theoretical Background

The Rank-Nullity Theorem states:

Rank(A) + Nullity(A) = Number of columns of A

This helps understand how a matrix maps input space between:
- Kernel (Nullspace): vectors flattened to zero  
- Range (Column Space): preserved output directions

## Built With

- Python  
- NumPy  
- SciPy  
- Matplotlib / Plotly  
- HTML + JavaScript (for UI)

## How to Run Locally

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/rank-nullity-visualizer.git
   cd rank-nullity-visualizer
   ```

2. Install dependencies:
   ```
   pip install numpy scipy matplotlib plotly
   ```

3. Run the script:
   ```
   python app.py
   ```

4. Open the output window or the generated HTML interface.

## Authors

- Anjali Kakde
- Rosh R

## License

This project is open-source and available under the MIT License.
