build_darwin:
	mkdir -p dist/darwin/Clutch.app/Contents/MacOS
	mkdir -p dist/darwin/Clutch.app/Contents/Resources
	cd daemon && go build -o ../dist/darwin/Clutch.app/Contents/MacOS/clutch
	cp daemon/build/darwin/Info.plist dist/darwin/Clutch.app/Contents
	cp -R app dist/darwin/Clutch.app/Contents/MacOS