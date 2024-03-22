.PHONY: all install run clean

all: install run

install:
	# Install dependencies
	npx expo install expo-linear-gradient
	npm install @react-navigation/stack
	npm install react-navigation
	npm install @react-navigation/native @react-navigation/native-stack
	npx expo install firebase
	npx expo install react-native-screens react-native-safe-area-context

run:
	npx expo start

clean:
	rm -rf node_modules
