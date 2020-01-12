import numpy as np
import imageio

arr = imageio.imread('1.png').flatten().reshape(1, -1)
print(arr)

for i in range(2,649+1):
    img = imageio.imread(f'{i}.png')
    flattened = img.flatten()
    # print(i,flattened)
    try:
        arr = np.append(arr, flattened.reshape(1,-1), axis=0)
    except:
        print(i)
        pass

print(arr.shape)
np.save('pkmn_sprites.npy', arr)
# np.savetxt('pkmn_sprites.csv', arr, delimiter=',', fmt='%d,')
