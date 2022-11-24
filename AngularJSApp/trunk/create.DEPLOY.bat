md DEPLOY
del DEPLOY /q /s
del DEPLOY.7z /q /s

robocopy source.WEB								   DEPLOY *.* 								/XF *.~* *.File *.config *.sln *.csproj %1 /A-:A
robocopy source.WEB\bin                            DEPLOY\bin *.* 							/XF *.~* *.File %1 /A-:A /s
robocopy source.WEB\BusinessPages                  DEPLOY\BusinessPages *.* 				/XF *.~* *.File %1 /A-:A /s
robocopy source.WEB\Dictionary                     DEPLOY\Dictionary *.* 					/XF *.~* *.File %1 /A-:A /s
robocopy source.WEB\Images                         DEPLOY\Images *.* 						/XF *.~* *.File %1 /A-:A /s
robocopy source.WEB\obj                            DEPLOY\obj *.* 							/XF *.~* *.File %1 /A-:A /s
robocopy source.WEB\packages                       DEPLOY\packages *.* 						/XF *.~* *.File %1 /A-:A /s
robocopy source.WEB\Resources                      DEPLOY\Resources *.* 					/XF *.~* *.File %1 /A-:A /s
robocopy source.WEB\scripts                        DEPLOY\scripts *.* 						/XF *.~* *.File %1 /A-:A /s
robocopy source.WEB\Styles                         DEPLOY\Styles *.* 						/XF *.~* *.File %1 /A-:A /s

C:\Programmi\7-Zip\7z a DEPLOY ./DEPLOY/*
@RD /S /Q DEPLOY

pause

