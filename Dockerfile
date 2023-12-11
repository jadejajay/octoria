# Pull the base image
FROM node:18.19-alpine3.18

# Set working directory in the Docker container
WORKDIR /usr/src/app

# Install dependencies for Java and Android SDK
RUN apk add --no-cache openjdk8
RUN apk add --update --no-cache bash unzip

# Set environment variables
ENV JAVA_HOME=/usr/lib/jvm/java-1.8-openjdk
ENV ANDROID_HOME=/usr/local/android-sdk
ENV PATH=$PATH:$JAVA_HOME/bin:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

# Download and unzip Android SDK
RUN wget -q https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip -O android-sdk.zip \
    && unzip -q android-sdk.zip -d $ANDROID_HOME \
    && rm android-sdk.zip

# Install Android SDK platform-tools
RUN $ANDROID_HOME/tools/bin/sdkmanager "platform-tools"

# Accept Android SDK licenses
RUN yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install -g pnpm@8.6.5
RUN pnpm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Expose the port
EXPOSE 8081

# Start the application
# CMD tail -f /dev/null
# Start the application
CMD ["pnpm", "android"]