require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "optimove-react-native"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => "https://github.com/optimove-tech/Optimove-SDK-React-Native/.git", :tag => "#{s.version}" }
  s.header_dir   = "OptimoveReactNative"
  s.source_files = "ios/**/*.{h,m,mm,cpp,swift}"
  s.swift_version = '5.0'
  s.public_header_files = []

  s.dependency 'OptimoveCore', '~> 6.2.3'
  s.dependency 'OptimoveSDK', '~> 6.2.3'

  install_modules_dependencies(s)
end
