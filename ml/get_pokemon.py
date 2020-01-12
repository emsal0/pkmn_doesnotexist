import vae_init
import numpy as np
import matplotlib.pyplot as plt
import base64
import imageio
from io import BytesIO
import sys

args = sys.argv

train_image_data = np.load('pokemon_sprites/black-white/pkmn_sprites.npy')
train_images = train_image_data.reshape(train_image_data.shape[0], 96, 96, 4).astype('float32')

# Normalizing the images to the range of [0., 1.]
train_images /= 255.


# Binarization
train_images[train_images >= .5] = 1.
train_images[train_images < .5] = 0.

train_image_data = np.load('pokemon_sprites/black-white/pkmn_sprites.npy')
train_images = train_image_data.reshape(train_image_data.shape[0], 96, 96, 4).astype('float32')

# Normalizing the images to the range of [0., 1.]
train_images /= 255.

# Binarization
train_images[train_images >= .5] = 1.
train_images[train_images < .5] = 0.

def get_poke_nums(poketypes):
    to_sample_from = []
    for poketype in poketypes:
        if poketype is not None:
            with open('pokemon_types/%s.txt' % poketype) as type_file:
                nums = [int(line.strip()) for line in type_file.readlines()]
                for i in range(len(nums)):
                    if nums[i] <= 201:
                        nums[i] -= 1
                    else:
                        nums[i] -= 2
                to_sample_from += nums
    return to_sample_from

def get_img(poketypes):
    to_sample_from = get_poke_nums(poketypes)
    pkmn = train_images[np.array(to_sample_from), :, :, :]
    y = vae_init.MODEL.encode(pkmn)

    zm = np.mean(y[0], axis=0)
    zc = np.cov(np.transpose(y[0]))
    z = np.random.multivariate_normal(zm, zc).reshape(1, -1).astype('float32')

    zv = np.mean(y[1], axis=0)
    zvv = np.cov(np.transpose(y[1]))
    zzv = np.random.multivariate_normal(zv, zvv).reshape(1, -1).astype('float32')

    decoded = vae_init.MODEL.decode((z, zzv))
    return decoded[0]


if __name__ == '__main__':
    to_sample_from = get_poke_nums(args[1:])

    decoded = None

    if to_sample_from:
        pkmn = train_images[np.array(to_sample_from), :, :, :]
        # fire_pkmn = train_images[:, :, :, :]
        # fire_pkmn_mean = np.mean(fire_pkmn, axis=1)
        # fire_pkmn_cov = np.cov(fire_pkmn)

        # fire_pkmn_sample = np.random.multivariate_normal(fire_pkmn_mean, fire_pkmn_cov)

        y = vae_init.MODEL.encode(pkmn)
        # print(y[0].shape)

        zm = np.mean(y[0], axis=0)
        zc = np.cov(np.transpose(y[0]))
        # print(zc, zc.shape)
        z = np.random.multivariate_normal(zm, zc).reshape(1, -1).astype('float32')
        # print(z)

        zv = np.mean(y[1], axis=0)
        zvv = np.cov(np.transpose(y[1]))
        zzv = np.random.multivariate_normal(zv, zvv).reshape(1, -1).astype('float32')
        # print(z)
        # print (z.shape)

        # print(y, y.size)
        # zt = tf.convert_to_tensor(z)
        # print(zt, zt.size)

        # decoded = vae_init.MODEL.decode((tf.convert_to_tensor(z), tf.convert_to_tensor(zzv)))
        decoded = vae_init.MODEL.decode((z, zzv))
    else:
        decoded = vae_init.MODEL.sample()
    fig = plt.figure()
    plt.imshow(decoded[0])
    plt.axis('off')
    figfile = BytesIO()
    plt.savefig(figfile, format='png')
    figdata = base64.b64encode(figfile.getvalue())
    print(figdata.decode('utf8'))
