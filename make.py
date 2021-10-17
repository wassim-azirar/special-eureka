import os
import time

from yaspin import yaspin
from datetime import datetime
from distutils.dir_util import copy_tree
from shutil import rmtree, make_archive
from subprocess import Popen

with yaspin(color="yellow", timer=True):
    print("1/6 delete dist folder")
    rmtree("dist", True)

    print("\n2/6 build extension")
    process = Popen('yarn build', shell=True)
    process.wait()

    print("\n3/6 create dist folder")
    os.makedirs("dist")

    print("\n4/6 copy files from build to dist")
    copy_tree("build", "dist")

    print("\n5/6 delete build folder")
    rmtree("build", True)

    print("\n6/6 rename index.html to popup.html")
    os.rename('dist/index.html', 'dist/popup.html')

    current_datetime = datetime.today().strftime('%Y_%m_%d_%H_%M')
    make_archive(f'releases/release_{current_datetime}', 'zip', "dist")