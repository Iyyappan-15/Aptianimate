from PIL import Image
import numpy as np
from collections import deque

img = Image.open('public/trophy.png').convert('RGBA')
data = np.array(img, dtype=np.float32)
h, w = data.shape[:2]

# Flood-fill from all 4 corners to find background pixels
# Background = light blue/white gradient
visited = np.zeros((h, w), dtype=bool)
queue = deque()

# Seed from all edges
for x in range(w):
    queue.append((0, x))
    queue.append((h-1, x))
for y in range(h):
    queue.append((y, 0))
    queue.append((y, w-1))

# Threshold: consider a pixel background if it's light enough
def is_background(r, g, b):
    # Light blue/white gradient pixels
    brightness = (r + g + b) / 3
    return brightness > 200 and abs(r - g) < 40 and abs(g - b) < 40

result = data.copy()
while queue:
    y, x = queue.popleft()
    if y < 0 or y >= h or x < 0 or x >= w:
        continue
    if visited[y, x]:
        continue
    visited[y, x] = True
    r, g, b, a = data[y, x]
    if is_background(r, g, b):
        result[y, x, 3] = 0  # Make transparent
        queue.append((y+1, x))
        queue.append((y-1, x))
        queue.append((y, x+1))
        queue.append((y, x-1))

out = Image.fromarray(result.astype(np.uint8), 'RGBA')
out.save('public/trophy.png', 'PNG')
print("Background removed successfully!")
