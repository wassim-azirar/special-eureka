import os

from datetime import datetime
from distutils.dir_util import copy_tree
from shutil import rmtree, make_archive
from subprocess import Popen

print("1/7 delete dist folder")
rmtree("dist", True)

print("\n2/7 build extension")
process = Popen('yarn build --silent', shell=True)
process.wait()

print("\n3/7 create dist folder")
os.makedirs("dist")

print("\n4/7 copy files from build to dist")
copy_tree("build", "dist")

print("\n5/7 delete build folder")
rmtree("build", True)

print("\n6/7 rename index.html to popup.html")
os.rename('dist/index.html', 'dist/popup.html')

print("\n7/7 create release file")
current_datetime = datetime.today().strftime('%Y_%m_%d_%H_%M')
make_archive(f'releases/release_{current_datetime}', 'zip', "dist")